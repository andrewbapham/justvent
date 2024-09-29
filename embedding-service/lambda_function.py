import psycopg2
import requests
import os

conn = psycopg2.connect(os.environ['DATABASE_URL'])
os.environ['API_URL']
os.environ['API_KEY']


def get_embeddings(text_inputs: list[str], user_id: str, journal_id: str, dimensions=1024, late_chunking=True) -> list[dict]:
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
        embeddings.append({
            "embedding": embedding, "index": index, "user_id": user_id, "journal_id": journal_id, "text": text_inputs[index]
        })

    return embeddings


def post_embedding(event, context):
    if not event['text']:
        return {"message": "empty text"}
    if not event['user_id']:
        return {"message": "empty user_id"}
    if not event['journal_id']:
        return {"message": "empty journal_id"}

    embeddings_list = get_embeddings(
        event['text'], event['user_id'], event['journal_id'])

    cursor = conn.cursor()
    for embedding in embeddings_list:
        cursor.execute("INSERT INTO embeddings (user_id, journal_id, journal_index, text, embedding) VALUES (%s, %s, %s, %s, %s)",
                       (event["user_id"], event["journal_id"],  embedding["index"], embedding["text"], embedding["embedding"]))

    conn.commit()
    return {"message": f"added {len(embeddings_list)} embeddings"}


def get_related(user_id: str, text: str, limit: int = 10):
    cursor = conn.cursor()
    embedding = get_embeddings([text], None, None)[0]
    query = "SELECT text, journal_id, journal_index FROM (SELECT * FROM embeddings WHERE user_id = %s) AS user_embeddings ORDER BY user_embeddings.embedding <=> CAST(%s as vector) LIMIT %s;"
    cursor.execute(query, (user_id, embedding["embedding"], limit))

    return cursor.fetchall()
