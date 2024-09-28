from fastapi import APIRouter
from database import db
from datetime import datetime, timezone
from models.journal_types import Journal, JournalSearch
from util.mongo_utils import serialize_ids

router = APIRouter()

@router.get("/journals/user/{user_id}")
async def get_journals(user_id: str):
    # parse date to datetime object
    journals = list(db.journals.find({"user_id": user_id}))

    journals = [serialize_ids(journal) for journal in journals]
    return {"journals": journals}

@router.post("/journals")
async def create_journal(journal: Journal):
    document = journal.model_dump()
    document.update({"date": str(datetime.now(timezone.utc))})
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
    if not db.journals.find_one({"_id": journal_id}):
        return {"message": "Journal not found"}
    db.journals.delete_one({"_id": journal_id})
    return {"message": "Journal deleted"}

@router.post("/journals/search")
async def search_journals(journal_search: JournalSearch):
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

# generate a script that will insert test data to the journals collection
# with multiple different dates, user_ids, and content using the current time then adding a timedelta