from fastapi import FastAPI
from app.routers import userRouter
from app.db.database import Base, engine

app = FastAPI()

# יצירת הטבלאות במסד הנתונים
Base.metadata.create_all(bind=engine)

app.include_router(userRouter.router)