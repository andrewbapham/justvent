from fastapi import APIRouter
from dotenv import load_dotenv
import os
from models.embedding_types import EmbeddingObject, EmbeddingRequest
import psycopg
from psycopg.rows import dict_row
import requests

conn = psycopg.connect(os.environ['DB_URL'], row_factory=dict_row)
router = APIRouter()


def get_embeddings(text_inputs: list[str], user_id: str, journal_id: str, dimensions=1024, late_chunking=True) -> list[EmbeddingObject]:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ['API_KEY']}",
    }

    data = {
        "model": "jina-embeddings-v3",
        "task": "text-matching",
        "dimensions": dimensions,
        "late_chunking": late_chunking,
        "embedding_type": "float",
        "input": text_inputs
    }

    response = requests.post(os.environ['API_URL'], headers=headers, json=data)
    if response.status_code != 200:
        raise Exception(f"Failed to get embeddings: {response.text}")
    res = response.json()
    embeddings = []
    for embedding_object in res["data"]:
        embedding = embedding_object["embedding"]
        index = embedding_object["index"]
        # index would be the sentence/paragraph index, useful for
        # maybe highlighting/centering around the found text
        embeddings.append(EmbeddingObject(
            embedding=embedding, index=index, user_id=user_id, journal_id=journal_id, text=text_inputs[index]))

    return embeddings


@router.post("/embeddings/add_embeddings")
async def post_embedding(body: EmbeddingRequest) -> dict:
    embeddings_list = get_embeddings(
        body.text, body.user_id, body.journal_id)
    # embeddings_list = [EmbeddingObject(user_id=body.user_id, journal_id=body.journal_id, embedding=[0.1, 0.2, 0.3], index=0, text="hello world 1"),
    #                    EmbeddingObject(user_id=body.user_id, journal_id=body.journal_id, embedding=[0.4, 0.5, 0.6], index=1, text="today i feel sad")]
    cursor = conn.cursor()
    with conn.transaction():
        for embedding in embeddings_list:
            cursor.execute("INSERT INTO embeddings (user_id, journal_id, journal_index, text, embedding) VALUES (%s, %s, %s, %s, %s)",
                           (body.user_id, body.journal_id,  embedding.index, embedding.text, embedding.embedding))

    return {"message": f"added {len(embeddings_list)} embeddings"}


@router.get("/embeddings/get_related")
async def get_related(user_id: str, text: str, limit: int = 10):
    cursor = conn.cursor()
    embedding = get_embeddings([text], None, None)[0]
    query = "SELECT text, journal_id, journal_index FROM (SELECT * FROM embeddings WHERE user_id = %s) AS user_embeddings ORDER BY user_embeddings.embedding <=> CAST(%s as vector) LIMIT %s;"
    cursor.execute(query, (user_id, embedding.embedding, limit))

    return cursor.fetchall()
