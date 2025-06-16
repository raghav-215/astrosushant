from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, Form, status
from fastapi.middleware.cors import CORSMiddleware
import yagmail
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_PASS = os.getenv("GMAIL_PASS")

@app.post("/api/submit", status_code=status.HTTP_200_OK)
def submit_form(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    consultation_type: str = Form(...),
    question: str = Form(...)
):
    body = f"""
    🔮 New Astrology Consultation Request 🔮

    👤 Name: {name}
    📧 Email: {email}
    📞 Phone: {phone}
    📋 Type: {consultation_type}
    ❓ Question: {question}
    """

    try:
        yag = yagmail.SMTP(GMAIL_USER, GMAIL_PASS)
        yag.send(to=GMAIL_USER, subject="New Astrology Consultation", contents=body)
        return {"status": "Message sent!"}
    except Exception as e:
        return {"status": "Failed to send message", "error": str(e)}
