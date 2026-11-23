import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="DevOps AI Backend - By Aathi")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str
    keywords: str
    answer: str

@app.get("/")
def home():
    return {"status": "DevOps AI Backend is Running!", "by": "Aathi"}

@app.get("/health")
def health():
    return {"status": "OK"}

@app.get("/ask")
def ask(q: str):
    q = q.lower().strip()
    result = supabase.table("questions").select("*").execute()
    best_match = None
    for item in result.data:
        keywords = item["keywords"].lower().split(",")
        for kw in keywords:
            kw = kw.strip()
            if kw and kw in q:
                best_match = item
                break
        if best_match:
            break
    if best_match:
        return {"found": True, "question": best_match["question"], "answer": best_match["answer"]}
    return {"found": False, "question": q, "answer": "Not in my brain yet. Try: What is Docker? Or What is Jenkins?"}

@app.get("/questions")
def get_all():
    result = supabase.table("questions").select("*").order("id").execute()
    return result.data

@app.post("/admin/add")
def add_question(data: Question):
    result = supabase.table("questions").insert({
        "question": data.question,
        "keywords": data.keywords,
        "answer": data.answer
    }).execute()
    return {"success": True, "saved": result.data}

@app.delete("/admin/delete/{id}")
def delete_question(id: int):
    supabase.table("questions").delete().eq("id", id).execute()
    return {"success": True, "deleted_id": id}