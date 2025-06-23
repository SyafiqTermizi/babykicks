from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/")
def say_hello():
    return {"hello": "hello"}
