from fastapi import FastAPI
import routers.journals as journals

app = FastAPI()

app.include_router(journals.router, prefix="/api/v1", tags=["journals"])

app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok"}