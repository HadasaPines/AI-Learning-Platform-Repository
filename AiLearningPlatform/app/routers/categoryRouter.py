from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import categorySchema as schemas
from app.services import categoryService as service
from app.db.database import SessionLocal

router = APIRouter(prefix="/categories", tags=["categories"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/", response_model=schemas.CategoryInDB)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return service.create_category(db, category)
@router.get("/{category_id}", response_model=schemas.CategoryInDB)
def read_category(category_id: int, db: Session = Depends(get_db)):
    return service.get_category(db, category_id)
@router.get("/", response_model=list[schemas.CategoryInDB])
def read_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_categories(db, skip=skip, limit=limit)
@router.put("/{category_id}", response_model=schemas.CategoryInDB)
def update_category(category_id: int, category_update: schemas.CategoryUpdate, db: Session = Depends(get_db)):
    return service.update_category(db, category_id, category_update)
@router.delete("/{category_id}", response_model=dict)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    return service.delete_category(db, category_id)




