from fastapi import FastAPI, HTTPException
from app.routers import userRouter,categoryRouter,subCategoryRouter, promptRouter,adminRouter
from app.db.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from app.exceptions.exceptions import (
    validation_exception_handler,
    http_exception_handler,
    unhandled_exception_handler
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.include_router(userRouter.router)
app.include_router(categoryRouter.router)
app.include_router(subCategoryRouter.router)
app.include_router(promptRouter.router)
app.include_router(adminRouter.router)

