from enum import Enum
from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class DateLength(Enum):
    DAY = 1
    WEEK = 7
    MONTH = 30
    YEAR = 365

class EmotionDateRange(BaseModel):
    range_type: Literal["day", "week", "month", "year"] | None = None
    start_date: str