from fastapi import APIRouter
from bson import ObjectId
from database import db
from datetime import date
from models.journal_types import Journal, JournalSearch
from util.mongo_utils import serialize_ids
from tools.emotion_detection import EmotionDetection

router = APIRouter()
detector = EmotionDetection()

@router.get("/journals/user/{user_id}")
async def get_journals(user_id: str):
    """
    Retrieves all journals for a user given an input user_id.
    """
    # parse date to datetime object
    journals = list(db.journals.find({"user_id": user_id}))

    journals = [serialize_ids(journal) for journal in journals]
    return {"journals": journals}

@router.post("/journals")
async def create_journal(journal: Journal):
    """
    Creates a journal entry given a Journal object. \n
    Date is auto-generated based on the current time.
    """
    document = journal.model_dump()
    document.update({"date": str(date.today())})
    document.update({"emotions": str(detector.getEmotions(document["content"]))})
    #document.update({"date": str(journal.date)})
    journal_id = db.journals.insert_one(document).inserted_id
    return {
        "message": "Journal created", 
        "journal_id": str(journal_id)
    }

@router.put("/journals/{journal_id}")
async def update_journal(journal_id: str, journal: dict):
    db.journals.update_one({"_id": journal_id}, {"$set": journal})
    return {"message": "Journal updated"}

@router.delete("/journals/{journal_id}")
async def delete_journal(journal_id: str):
    """
    Deletes a journal entry given an input journal_id.
    """
    # Convert journal_id to ObjectId
    try:
        obj_id = ObjectId(journal_id)
    except Exception:
        raise BaseException()
    if not db.journals.find_one({"_id": obj_id}):
        return {"message": db.journals}
    db.journals.delete_one({"_id": obj_id})
    return {"message": "Journal deleted"}

@router.post("/journals/search")
async def search_journals(journal_search: JournalSearch):
    """
    Searches for journals based on the input JournalSearch object. \n
    If date_exact is provided, `date_start` and `date_end` are overrided. \n
    Either `date_start` or date_end can be provided, if one is not, the range will be unbounded.
    e.g. if `date_start` is provided and `date_end` is not, all journals after that date will be returned. \n
    `query_type` can be either "gte" or "lte" to specify greater than or less than or equal to the count.
    """
    query = {}
    # date range queries
    if journal_search.date_exact:
        query.update({"date": str(journal_search.date_exact)})
    elif journal_search.date_start and journal_search.date_end:
        query.update({"date": {"$gte": str(journal_search.date_start), "$lte": str(journal_search.date_end)}})
    elif journal_search.date_start:
        query.update({"date": {"$gte": str(journal_search.date_start)}})
    elif journal_search.date_end:
        query.update({"date": {"$lte": str(journal_search.date_end)}})

    if journal_search.content:
        query.update({"$text": {"$search": journal_search.content}})
    
    if journal_search.emotions:
        for emotion_query in journal_search.emotions:
            if emotion_query.query_type == "gte":
                query.update({f"emotions.{emotion_query.emotion}" : {"$gte": emotion_query.count}})
            elif emotion_query.query_type == "lte":
                query.update({f"emotions.{emotion_query.emotion}" : {"$lte": emotion_query.count}})
    
    journals = list(db.journals.find(query))
    journals = [serialize_ids(journal) for journal in journals]
    return {"journals": journals}
