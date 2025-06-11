
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.prompt import Prompt
from app.schemas.promptSchema import PromptCreate, PromptUpdate

def create_prompt(db: Session, prompt: PromptCreate, ai_response: str=""):
    db_prompt = Prompt(
        user_id=prompt.user_id,
        category_id=prompt.category_id,
        sub_category_id=prompt.sub_category_id,
        prompt=prompt.prompt,
        response=ai_response
    )
    db.add(db_prompt)
    db.commit()
    db.refresh(db_prompt)
    return db_prompt

def get_prompt(db: Session, prompt_id: int):
    db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return db_prompt

def get_prompts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Prompt).offset(skip).limit(limit).all()

def update_prompt(db: Session, prompt_id: int, prompt_update: PromptUpdate):
    db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    if prompt_update.prompt is not None:
        db_prompt.prompt = prompt_update.prompt

    if prompt_update.category_id is not None:
        db_prompt.category_id = prompt_update.category_id
    if prompt_update.sub_category_id is not None:
        db_prompt.sub_category_id = prompt_update.sub_category_id

    db.commit()
    db.refresh(db_prompt)
    return db_prompt

def delete_prompt(db: Session, prompt_id: int):
    db_prompt = db.query(Prompt).filter(Prompt.id == prompt_id).first()
    if not db_prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    db.delete(db_prompt)
    db.commit()
    return {"detail": "Prompt deleted successfully"}

def get_prompts_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 20):
    prompts = db.query(Prompt).filter(Prompt.user_id == user_id).offset(skip).limit(limit).all()
    if not prompts:
        raise HTTPException(status_code=404, detail="No prompts found for this user")
    return prompts
