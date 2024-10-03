package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/jackc/pgx/v5"
)

type LambdaRequest struct {
	AddEmbeddings    AddEmbeddings    `json:"add_embeddings"`
	SearchEmbeddings SearchEmbeddings `json:"search_embeddings"`
}

type LambdaResponse struct {
	SearchResults SearchEmbeddingsResponse `json:"search_results"`
	AddResults    AddEmbeddingsResponse    `json:"add_results"`
}

type SearchEmbeddings struct {
	UserId string `json:"user_id"`
	Text   string `json:"text"`
	Limit  int    `json:"limit"`
}

type SearchEmbeddingsResponse struct {
	Results []TextFragment `json:"results"`
}

type AddEmbeddings struct {
	Text      []string `json:"text"`
	UserId    string   `json:"user_id"`
	JournalId string   `json:"journal_id"`
}

type AddEmbeddingsResponse struct {
	Message string `json:"message"`
}

type EmbeddingApiRequest struct {
	Input         []string `json:"input"`
	Model         string   `json:"model"`
	Task          string   `json:"task"`
	Dimensions    int      `json:"dimensions"`
	LateChunking  bool     `json:"late_chunking"`
	EmbeddingType string   `json:"embedding_type"`
}

type EmbeddingApiResponse struct {
	Model  string          `json:"model"`
	Object string          `json:"object"`
	Data   []EmbeddingData `json:"data"`
}

type EmbeddingData struct {
	Index     int       `json:"index"`
	Embedding []float32 `json:"embedding"`
}

type TextFragment struct {
	Text      string `json:"text"`
	Index     int    `json:"index"`
	JournalId string `json:"journal_index"`
}

type Vector struct {
	vec []float32
}

func NewVector(vec []float32) Vector {
	return Vector{vec: vec}
}

func (v Vector) String() string {
	buf := make([]byte, 0, 2+16*len(v.vec))
	buf = append(buf, '[')

	for i := 0; i < len(v.vec); i++ {
		if i > 0 {
			buf = append(buf, ',')
		}
		buf = strconv.AppendFloat(buf, float64(v.vec[i]), 'f', -1, 32)
	}

	buf = append(buf, ']')
	return string(buf)
}

func lambdaHandler(event *LambdaRequest, db *pgx.Conn) (LambdaResponse, error) {
	if len(event.AddEmbeddings.Text) > 0 || event.AddEmbeddings.UserId != "" || event.AddEmbeddings.JournalId != "" {
		res, err := addJournalEmbeddings(&event.AddEmbeddings, db)
		if err != nil {
			return LambdaResponse{}, fmt.Errorf("Error adding embeddings: %v", err)
		}
		lambdaResponse := LambdaResponse{AddResults: res}
		return lambdaResponse, nil
	}

	if event.SearchEmbeddings != (SearchEmbeddings{}) {
		values, err := semanticSearch(&event.SearchEmbeddings, db)
		if err != nil {
			return LambdaResponse{}, fmt.Errorf("Error searching embeddings: %v", err)
		}
		fmt.Printf("Values from lambda request: %v\n", values)

		lambdaResponse := LambdaResponse{SearchResults: values}
		return lambdaResponse, nil

	}

	return LambdaResponse{}, fmt.Errorf("No event provided")
}

func addJournalEmbeddings(event *AddEmbeddings, db *pgx.Conn) (AddEmbeddingsResponse, error) {
	// Add embeddings to the database
	if event == nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("No event provided")
	}

	if len(event.Text) == 0 {
		return AddEmbeddingsResponse{}, fmt.Errorf("No text provided")
	}

	embeddingResponse, err := getEmbeddings(&EmbeddingApiRequest{Input: event.Text})
	if err != nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("Error getting embeddings: %v", err)
	}

	// Add the embeddings to the database
	for _, embedding := range embeddingResponse.Data {
		text := event.Text[embedding.Index]
		embeddingData := embedding.Embedding
		fmt.Printf("Adding embedding for text: %s\n", text)
		//query := "INSERT INTO embeddings (user_id, journal_id, journal_index, text, embedding) VALUES (%s, %s, %s, %s, %s)"

		_, err := db.Exec(context.Background(), "INSERT INTO embeddings (user_id, journal_id, journal_index, text, embedding) VALUES ($1, $2, $3, $4, CAST($5 as vector))",
			event.UserId, event.JournalId, embedding.Index, text, NewVector(embeddingData))
		if err != nil {
			return AddEmbeddingsResponse{}, fmt.Errorf("error inserting embedding: %v", err)
		}
	}
	//db.BeginBatch().QueryResults()

	// Call the embedding service
	// Return the response
	return AddEmbeddingsResponse{Message: "Embeddings added successfully"}, nil
}

func semanticSearch(event *SearchEmbeddings, db *pgx.Conn) (SearchEmbeddingsResponse, error) {
	// query the database for the embeddings
	embeddings, err := getEmbeddings(&EmbeddingApiRequest{Input: []string{event.Text}})
	if err != nil {
		return SearchEmbeddingsResponse{}, fmt.Errorf("Error getting embeddings: %v", err)
	}
	input_embedding := embeddings.Data[0].Embedding

	rows, err := db.Query(context.Background(), "SELECT text, journal_id, journal_index FROM embeddings WHERE user_id = $1 ORDER BY embedding <=> $2 LIMIT $3;", event.UserId, NewVector(input_embedding), event.Limit)
	if err != nil {
		return SearchEmbeddingsResponse{}, fmt.Errorf("Error querying database: %v", err)
	}
	//fmt.Printf("Query: %v\n", rows)
	var result = SearchEmbeddingsResponse{Results: []TextFragment{}}
	for rows.Next() {
		var text string
		var journal_id string
		var journal_index int
		err = rows.Scan(&text, &journal_id, &journal_index)
		if err != nil {
			return SearchEmbeddingsResponse{}, fmt.Errorf("Error scanning rows: %v", err)
		}
		obj := TextFragment{
			Text:      text,
			Index:     journal_index,
			JournalId: journal_id,
		}
		fmt.Printf("Adding result: %v\n", obj)

		result.Results = append(result.Results, obj)
	}
	fmt.Printf("Done scanning")

	return result, nil
}

func getEmbeddings(request_body *EmbeddingApiRequest) (EmbeddingApiResponse, error) {
	body_struct := EmbeddingApiRequest{
		Input:         request_body.Input,
		Model:         "jina-embeddings-v3",
		Task:          "text-matching",
		Dimensions:    1024,
		LateChunking:  true,
		EmbeddingType: "float",
	}

	body, err := json.Marshal(body_struct)
	if err != nil {
		return EmbeddingApiResponse{}, fmt.Errorf("Error marshalling body: %v", err)
	}
	resp, err := http.NewRequest(http.MethodPost, os.Getenv("API_URL"), bytes.NewBuffer(body))
	resp.Header.Add("Content-Type", "application/json")
	resp.Header.Add("Authorization", fmt.Sprintf("Bearer %s", os.Getenv("API_KEY")))

	response, err := http.DefaultClient.Do(resp)
	if err != nil {
		return EmbeddingApiResponse{}, fmt.Errorf("Error making embedding request: %v", err)
	}
	defer response.Body.Close()

	body, err = io.ReadAll(response.Body)
	if err != nil {
		return EmbeddingApiResponse{}, fmt.Errorf("Error reading response body: %v", err)
	}

	// Parse the response
	var embeddingResponse EmbeddingApiResponse
	err = json.Unmarshal(body, &embeddingResponse)

	if err != nil {
		return EmbeddingApiResponse{}, fmt.Errorf("Error unmarshalling response: %v", err)
	}
	return embeddingResponse, nil
}

type myQueryTracer struct {
	log *log.Logger
}

func (tracer *myQueryTracer) TraceQueryStart(
	ctx context.Context,
	_ *pgx.Conn,
	data pgx.TraceQueryStartData) context.Context {
	log.Printf("Executing command", "sql", data.SQL, "args", data.Args)
	return ctx
}

func (tracer *myQueryTracer) TraceQueryEnd(ctx context.Context, conn *pgx.Conn, data pgx.TraceQueryEndData) {
}

func main() {
	config, err := pgx.ParseConfig(os.Getenv("DATABASE_URL"))
	// Logging Block
	// if err != nil {
	// 	log.Fatalf("Unable to parse config: %v\n", err)
	// }

	// config.Tracer = &myQueryTracer{
	// 	log: &log.Logger{},
	// }

	conn, err := pgx.ConnectConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())

	// text := "Today was a mixed bag. I woke up feeling a bit groggy, but once I had my morning coffee, things picked up. I had an interesting conversation with my friend about our future plans. It’s weird how we’re both at this crossroads in our lives, trying to figure out what’s next. I’ve been thinking a lot about my career lately—whether I’m on the right path or if it’s time to try something new. The idea of starting over is terrifying, but staying stuck feels worse. In the afternoon, I went for a walk to clear my head. The weather was perfect, crisp with just a hint of fall in the air. As I walked through the park, I realized how much I’ve been neglecting time for myself. I get so caught up in work and other people’s problems that I forget to just be. I need to find a way to slow down. I spent the evening reading a new book—nothing too deep, just a light novel to escape for a bit. It helped, but my mind still wandered back to my worries. I’m not sure what tomorrow will bring, but for now, I’m trying to focus on the little things I’m grateful for. Maybe that’s enough for today."
	// // split text by period

	// inputs := strings.Split(text, ".")

	// data := AddEmbeddings{
	// 	Text:      inputs,
	// 	UserId:    "2",
	// 	JournalId: "b29sSL1nc23",
	// }

	//_, err = addJournalEmbeddings(&data, conn)
	// if err != nil {
	// 	log.Fatalf("Error adding embeddings: %v\n", err)
	// }

	semanticData := SearchEmbeddings{
		UserId: "2",
		Text:   "I was tired",
		Limit:  5,
	}

	res, err := lambdaHandler(&LambdaRequest{SearchEmbeddings: semanticData}, conn)
	if err != nil {
		log.Fatalf("Error searching embeddings: %v\n", err)
	}
	fmt.Printf("Response: %v\n", res)
	// lambda.Start(addJournalEmbeddings)
}
