import os
from dotenv import load_dotenv

load_dotenv()  # טען משתנים מקובץ .env

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")