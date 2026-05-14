from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Разрешаем запросы от фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str

users_db = {"admin": "12345"}

@app.post("/register")
def register(user: User):
    if user.username in users_db:
        return {"message": "User already exists"}
    users_db[user.username] = user.password
    return {"message": f"User {user.username} registered!"}

@app.post("/login")
def login(user: User):
    if users_db.get(user.username) == user.password:
        return {"status": "success", "token": "fake-jwt-token"}
    return {"status": "error", "message": "Invalid credentials"}
