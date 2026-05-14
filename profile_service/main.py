from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

favorites_db = {}

@app.get("/favorites/{username}")
def get_favorites(username: str):
    return {"username": username, "favorites": favorites_db.get(username, [])}

@app.post("/favorites/{username}/add")
def add_favorite(username: str, tool: str):
    if username not in favorites_db:
        favorites_db[username] = []
    if tool not in favorites_db[username]:
        favorites_db[username].append(tool)
    return {"message": f"Added {tool} to favorites"}

@app.delete("/favorites/{username}/remove")
def remove_favorite(username: str, tool_id: str):
    if username in favorites_db and tool_id in favorites_db[username]:
        favorites_db[username].remove(tool_id)
        return {"message": "Removed"}
    return {"message": "Not found"}, 404
