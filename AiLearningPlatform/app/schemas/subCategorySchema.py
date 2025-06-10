from pydantic import BaseModel
from typing import Optional
from app.schemas.categorySchema import CategoryInDB

class SubCategoryBase(BaseModel):
    name: str
    category_id: int

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategoryUpdate(BaseModel):
    name: Optional[str] = None
    category_id: Optional[int] = None

class SubCategoryInDB(SubCategoryBase):
    id: int
    category: CategoryInDB

    class Config:
        from_attributes = True  

