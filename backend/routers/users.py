from fastapi import APIRouter, Query
from database import db
from datetime import datetime, timedelta, timezone
from typing import Annotated, Dict
import collections

from models.user_types import DateLength, EmotionDateRange

router = APIRouter()

@router.get("/users/emotions/{user_id}")
async def get_user_emotions(user_id: str, date_query: Annotated[EmotionDateRange, Query()]) -> Dict[str, float]:
    """
    Returns the average value of each emotion for a user within a given date range.
    Acceptable date ranges are:
    - `"day"`
    - `"week"`
    - `"month"`
    - `"year"`

    The date range is inclusive of the start date and exclusive of the end date.
    """
    # Get date range
    start_date = date_query.start_date.replace(microsecond=0, second=0, minute=0, hour=0)
    
    date_offset = DateLength[date_query.range_type.upper()].value
    # offset by 1 second to get the end of the day, and not include records from midnight of the next day
    end_date = start_date + timedelta(days=date_offset, seconds=-1)

    # Convert to string so mongo can query properly
    start_date = str(start_date.astimezone(timezone.utc))
    end_date = str(end_date.astimezone(timezone.utc))
    print(start_date, end_date)

    # Get all journals within the date range
    journals = list(db.journals.find({"user_id": user_id, "date": {"$gte": start_date, "$lte": end_date}}))
    print(len(journals))
    if not journals:
        return {"message": "No journals found for user in date range"}
    
    # Calculate average emotions
    emotions = collections.defaultdict(list)
    for journal in journals:
        for emotion, value in journal["emotions"].items():
            emotions[emotion].append(value)
    
    emotion_averages = {}
    for emotion, values in emotions.items():
        emotion_averages[emotion] = sum(values) / len(values)

    return emotion_averages
