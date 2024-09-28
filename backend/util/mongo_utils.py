def serialize_ids(doc):
    doc["_id"] = str(doc["_id"])
    return doc