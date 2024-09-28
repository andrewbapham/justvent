from fastapi import FastAPI
import routers.journals as journals
import routers.users as users

tags_metadata = [
    {
        "name": "journals",
        "description": "Operations with journals."
    },
    {
        "name": "users",
        "description": "Operations with users."
    }
]

app = FastAPI()

app.include_router(journals.router, prefix="/api/v1", tags=["journals"])
app.include_router(users.router, prefix="/api/v1", tags=["users"])

app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok"}