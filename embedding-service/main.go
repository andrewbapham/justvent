package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jackc/pgx/v5"
)

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

func addJournalEmbeddings(event *AddEmbeddings, db *pgx.Conn) (AddEmbeddingsResponse, error) {
	// Add embeddings to the database
	if event == nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("No event provided")
	}

	if len(event.Text) == 0 {
		return AddEmbeddingsResponse{}, fmt.Errorf("No text provided")
	}

	body_struct := EmbeddingApiRequest{
		Input:         event.Text,
		Model:         "jina-embeddings-v3",
		Task:          "text-matching",
		Dimensions:    1024,
		LateChunking:  true,
		EmbeddingType: "float",
	}

	body, err := json.Marshal(body_struct)
	if err != nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("Error marshalling body: %v", err)
	}
	resp, err := http.NewRequest(http.MethodPost, os.Getenv("API_URL"), bytes.NewBuffer(body))
	resp.Header.Add("Content-Type", "application/json")
	resp.Header.Add("Authorization", fmt.Sprintf("Bearer %s", os.Getenv("API_KEY")))

	response, err := http.DefaultClient.Do(resp)
	if err != nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("Error making embedding request: %v", err)
	}
	defer response.Body.Close()

	body, err = ioutil.ReadAll(response.Body)
	if err != nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("Error reading response body: %v", err)
	}

	// Parse the response
	var embedding_response EmbeddingApiResponse
	err = json.Unmarshal(body, &embedding_response)

	if err != nil {
		return AddEmbeddingsResponse{}, fmt.Errorf("Error unmarshalling response: %v", err)
	}
	fmt.Printf("Response: %v\n", embedding_response.Data[0].Index)
	// Add the embeddings to the database
	for _, embedding := range embedding_response.Data {
		text := event.Text[embedding.Index]
		embedding_data := embedding.Embedding
		fmt.Printf("Adding embedding for text: %s\n", text)
		//query := "INSERT INTO embeddings (user_id, journal_id, journal_index, text, embedding) VALUES (%s, %s, %s, %s, %s)"

		_, err = db.Exec(context.Background(), "INSERT INTO embeddings (user_id, journal_id, journal_index, text, embedding) VALUES ($1, $2, $3, $4, CAST($5 as vector))",
			event.UserId, event.JournalId, embedding.Index, text, NewVector(embedding_data))
		if err != nil {
			return AddEmbeddingsResponse{}, fmt.Errorf("error inserting embedding: %v", err)
		}
	}
	//db.BeginBatch().QueryResults()

	// Call the embedding service
	// Return the response
	return AddEmbeddingsResponse{Message: "Embeddings added successfully"}, nil
}

func main() {
	os.Setenv("API_URL", "https://api.jina.ai/v1/embeddings")
	os.Setenv("API_KEY", "jina_a6fb38686d664c1085dd093b89bb3fe32KOrl95jej1T3B8nGvt54QMUGv47")
	os.Setenv("DATABASE_URL", "postgres://justvent_user:Hack_the_hill2@localhost:5432/justvent")

	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer conn.Close(context.Background())

	lambda.Start(addJournalEmbeddings)
}
