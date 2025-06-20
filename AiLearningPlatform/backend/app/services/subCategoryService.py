
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import SubCategory, Category
from app.schemas.subCategorySchema import SubCategoryCreate, SubCategoryUpdate

def create_sub_category(db: Session, sub_category: SubCategoryCreate):
    existing_sub_category = db.query(SubCategory).filter(SubCategory.name == sub_category.name).first()
    if existing_sub_category:
        raise HTTPException(status_code=409, detail="Sub-category already exists")
    category = db.query(Category).filter(Category.id == sub_category.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db_sub_category = SubCategory(name=sub_category.name, category_id=sub_category.category_id)
    db.add(db_sub_category)
    db.commit()
    db.refresh(db_sub_category)
    return db_sub_category

def get_sub_category(db: Session, sub_category_id: int):
    sub_category = db.query(SubCategory).filter(SubCategory.id == sub_category_id).first()
    if not sub_category:
        raise HTTPException(status_code=404, detail="Sub-category not found")
    return sub_category

def get_sub_categories(db: Session, skip: int = 0, limit: int = 10):
    return db.query(SubCategory).offset(skip).limit(limit).all()

def update_sub_category(db: Session, sub_category_id: int, sub_category_update: SubCategoryUpdate):
    sub_category = db.query(SubCategory).filter(SubCategory.id == sub_category_id).first()
    if not sub_category:
        raise HTTPException(status_code=404, detail="Sub-category not found")

    sub_category.name = sub_category_update.name or sub_category.name
    sub_category.category_id = sub_category_update.category_id or sub_category.category_id
    db.commit()
    db.refresh(sub_category)
    return sub_category

def delete_sub_category(db: Session, sub_category_id: int):
    sub_category = db.query(SubCategory).filter(SubCategory.id == sub_category_id).first()
    if not sub_category:
        raise HTTPException(status_code=404, detail="Sub-category not found")
    
    db.delete(sub_category)
    db.commit()
    return {"detail": "Sub-category deleted successfully"}

def get_sub_categories_by_category(db: Session, category_id: int, skip: int = 0, limit: int = 10):
    sub_categories = db.query(SubCategory).filter(SubCategory.category_id == category_id).offset(skip).limit(limit).all()
    if not sub_categories:
        raise HTTPException(status_code=404, detail="No sub-categories found for this category")
    return sub_categories
