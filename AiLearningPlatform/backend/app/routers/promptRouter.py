from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import promptSchema as schemas
from app.services import promptService as service
from app.db.database import SessionLocal
import asyncio

router = APIRouter(prefix="/prompts", tags=["prompts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.PromptInDB)
def create_prompt(prompt: schemas.PromptCreate, db: Session = Depends(get_db)):
    return service.create_prompt(db, prompt)


@router.get("/{prompt_id}", response_model=schemas.PromptInDB)
def read_prompt(prompt_id: int, db: Session = Depends(get_db)):
    return service.get_prompt(db, prompt_id)

@router.get("/", response_model=list[schemas.PromptInDB])
def read_prompts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_prompts(db, skip=skip, limit=limit)

@router.put("/{prompt_id}", response_model=schemas.PromptInDB)
def update_prompt(prompt_id: int, prompt_update: schemas.PromptUpdate, db: Session = Depends(get_db)):
    return service.update_prompt(db, prompt_id, prompt_update)

@router.delete("/{prompt_id}", response_model=dict)
def delete_prompt(prompt_id: int, db: Session = Depends(get_db)):
    return service.delete_prompt(db, prompt_id)
