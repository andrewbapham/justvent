from fastapi import APIRouter
from database import db
from datetime import datetime, timezone

from tools.emotion_detection import EmotionDetection


router = APIRouter()


@router.get("/journals/user/{user_id}")
async def get_emotion_value(text: str) -> Dict[float]:
    """
    Retrieves the emotion values for a given block of text.
    """
    result = EmotionDetection.getEmotions(text)

    return result
