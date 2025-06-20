
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user import User
from app.schemas.userSchema import UserCreate, UserUpdate, LoginRequest
from sqlalchemy.exc import IntegrityError
import traceback


def create_user(db: Session, user: UserCreate):
    existing_user = db.query(User).filter(User.phone == user.phone).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="Phone number already registered")
    
    db_user = User(name=user.name, phone=user.phone)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.name = user_update.name or user.name
    user.phone = user_update.phone or user.phone
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        db.delete(user)
        db.commit()
        return {"detail": "User deleted successfully"}

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Cannot delete user with related records")
    except Exception as e:
        db.rollback()
        print("❌ ERROR:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error")

def login_user(db: Session, phone: str):
    user = db.query(User).filter(User.phone == phone).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

