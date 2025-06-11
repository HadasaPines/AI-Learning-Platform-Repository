from app.db.database import Base, engine
from app.models import  subCategory  ,user, category,  prompt

Base.metadata.create_all(bind=engine)