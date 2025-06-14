# AI Learning Guided Platform - README

## Overview
This project is an AI-guided learning platform with a FastAPI backend, PostgreSQL database, and React frontend.  
It supports user registration, category and sub-category selection, prompt submission to AI, AI-generated responses, learning history tracking, and an admin dashboard.

---

## Technologies Used
- **Backend:** FastAPI (Python)  
- **Database:** PostgreSQL  
- **ORM:** SQLAlchemy  
- **Frontend:** React.js  
- **Containerization:** Docker & Docker Compose  
- **AI Integration:** OpenAI API  
- **API Documentation:** Swagger UI (via FastAPI)

---

## Setup Instructions

### Prerequisites
- Python 3.9 or higher  
- Node.js and npm/yarn  
- Docker and Docker Compose  
- Valid OpenAI API key

### Backend Setup
1. Copy `.env.example` to `.env` and update with your OpenAI API key and PostgreSQL credentials.  
2. Install Python dependencies:  
   ```bash
   pip install -r requirements.txt
   ```  
3. Run the backend server locally:  
   ```bash
   uvicorn app.main:app --reload
   ```  
4. Access API documentation via Swagger UI at:  
   ```
   http://localhost:8000/docs
   ```

### Database Setup with Docker
1. Use Docker Compose to start PostgreSQL service:  
   ```bash
   docker-compose up -d db
   ```  
2. Database data is persisted using Docker volumes.

### Running the Full Project with Docker
1. Build and start all services (backend, database, frontend if included):  
   ```bash
   docker-compose up --build
   ```

### Frontend Setup
1. Navigate to the frontend folder:  
   ```bash
   cd frontend
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start frontend development server:  
   ```bash
   npm start
   ```  
4. Open browser at:  
   ```
   http://localhost:3000
   ```

---

## Assumptions Made
- User registration requires only name and phone number; no passwords are used currently.  
- OpenAI API key is valid and active.  
- Swagger UI available at `/docs` endpoint on the backend server (default FastAPI).  
- Minimal user management and permissions system; no complex authentication flows yet.  
- PostgreSQL used with SQLAlchemy ORM for data persistence.  
- Docker Compose provides isolated, port-mapped services.  
- Categories and sub-categories managed via API endpoints.  
- Basic validation and error handling implemented (e.g. required fields, category checks).  
- Project is MVP and designed for future scalability and enhancements.

---

### ✨ API Endpoints

#### 🔹 User Endpoints
| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/users/`      | Register a new user with name and phone number. |

**Request Body Example:**
```json
{
  "name": "John Doe",
  "phone": "0501234567"
}
```

---

#### 🔹 Categories
| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| GET    | `/categories/`     | Get list of all categories. |
| GET    | `/categories/{id}` | Get a single category by ID. |

---

#### 🔹 Subcategories
| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| GET    | `/subcategories/`        | Get all subcategories.            |
| GET    | `/subcategories/{id}`    | Get a subcategory by ID.          |

---

#### 🔹 Prompts
| Method | Endpoint      | Description                                    |
|--------|---------------|------------------------------------------------|
| POST   | `/prompts/`   | Send a prompt and get AI response (OpenAI).   |
| GET    | `/prompts/`   | Get prompt history (all prompts).             |

**Request Body Example:**
```json
{
  "user_id": 1,
  "prompt": "Explain what is machine learning.",
  "category_id": 2,
  "sub_category_id": 5
}
```

**Response Example:**
```json
{
  "id": 12,
  "user_id": 1,
  "prompt": "Explain what is machine learning.",
  "category_id": 2,
  "sub_category_id": 5,
  "response": "Machine learning is a field of AI..."
}
```

---

### 🧪 API Docs

> Full interactive documentation available at:  
> 👉 `http://localhost:8000/docs` (Swagger UI)  
> 👉 `http://localhost:8000/redoc` (ReDoc alternative)

---

## 🔐 Admin Access

To log in as an **admin**, use the following:

- **Username:** `admin`

> This special username gives access to the admin dashboard.  
> No password is required at this stage (MVP assumption).

---
