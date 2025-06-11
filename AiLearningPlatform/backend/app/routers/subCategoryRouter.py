from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import subCategorySchema as schemas
from app.services import subCategoryService as service
from app.db.database import SessionLocal

router = APIRouter(prefix="/subcategories", tags=["subcategories"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.SubCategoryInDB)
def create_sub_category(sub_category: schemas.SubCategoryCreate, db: Session = Depends(get_db)):
    return service.create_sub_category(db, sub_category)

@router.get("/{sub_category_id}", response_model=schemas.SubCategoryInDB)
def read_sub_category(sub_category_id: int, db: Session = Depends(get_db)):
    return service.get_sub_category(db, sub_category_id)

@router.get("/", response_model=list[schemas.SubCategoryInDB])
def read_sub_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_sub_categories(db, skip=skip, limit=limit)

@router.put("/{sub_category_id}", response_model=schemas.SubCategoryInDB)
def update_sub_category(sub_category_id: int, sub_category_update: schemas.SubCategoryUpdate, db: Session = Depends(get_db)):
    return service.update_sub_category(db, sub_category_id, sub_category_update)

@router.delete("/{sub_category_id}", response_model=dict)
def delete_sub_category(sub_category_id: int, db: Session = Depends(get_db)):
    return service.delete_sub_category(db, sub_category_id)

@router.get("/category/{category_id}", response_model=list[schemas.SubCategoryInDB])
def read_sub_categories_by_category(category_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return service.get_sub_categories_by_category(db, category_id, skip=skip, limit=limit)

