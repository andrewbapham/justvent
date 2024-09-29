from pydantic import BaseModel
from typing import List, Literal, Dict
from datetime import datetime


class EmotionQuery(BaseModel):
    emotion: str
    count: int
    query_type: Literal["gte", "lte"]


class JournalSearch(BaseModel):
    user_id: str
    date_exact: datetime | None = None
    content: str | None = None
    emotions: List[EmotionQuery] | None = None
    date_start: datetime | None = None
    date_end: datetime | None = None


class Emotion(BaseModel):
    emotion: str
    count: float | int

class Journal(BaseModel):
    user_id: str
    content: str
    emotions: Dict[str, float | int] | None = None
    journal_id: str | None = None
    date: str | None = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "user_id": "abc123",
                "content": "this is a journal entry",
                "emotions": {
                    "sadness": 1,
                    "joy": 4
                },
                "date": "2024-09-28"
            }
        }
    }
