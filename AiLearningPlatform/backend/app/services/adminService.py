from sqlalchemy.orm import Session, joinedload
from app.models.user import User
from app.models.prompt import Prompt

def get_all_users(db: Session):
    return db.query(User).all()

def get_all_prompts_with_users(db: Session):
    return db.query(Prompt).options(joinedload(Prompt.user)).all()
