from pydantic import BaseModel


class EmbeddingRequest(BaseModel):
    text: list[str]
    user_id: str
    journal_id: str


class EmbeddingObject(BaseModel):
    embedding: list[float]
    index: int | None = None
    user_id: str | None = None
    journal_id: str | None = None
    text: str
