from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.services import adminService as service
from app.schemas import userSchema, promptSchema


router = APIRouter(prefix="/admin", tags=["admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users", response_model=list[userSchema.UserInDB])
def get_all_users(db: Session = Depends(get_db)):
    return service.get_all_users(db)

@router.get("/prompts", response_model=list[promptSchema.PromptWithUser])
def get_all_prompts(db: Session = Depends(get_db)):
    return service.get_all_prompts_with_users(db)
