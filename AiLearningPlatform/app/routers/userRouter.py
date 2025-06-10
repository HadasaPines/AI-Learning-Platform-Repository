from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import userSchema as schemas
from app.services import userService as service
from app.db.database import SessionLocal

router = APIRouter(prefix="/users", tags=["users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.UserInDB)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return service.create_user(db, user)

@router.get("/{user_id}", response_model=schemas.UserInDB)
def read_user(user_id: int, db: Session = Depends(get_db)):
    return service.get_user(db, user_id)

@router.get("/", response_model=list[schemas.UserInDB])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_users(db, skip=skip, limit=limit)

@router.put("/{user_id}", response_model=schemas.UserInDB)
def update_user(user_id: int, user_update: schemas.UserUpdate, db: Session = Depends(get_db)):
    return service.update_user(db, user_id, user_update)

@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return service.delete_user(db, user_id)
