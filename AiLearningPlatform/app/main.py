from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {"message": "AI Learning Platform is running 🚀"}