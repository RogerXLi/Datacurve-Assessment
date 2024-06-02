from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import engine, SessionLocal
from runcode import runCode
from schemas import CodeSchema
from models import Base, CodeItem
from sqlalchemy.orm import Session

app = FastAPI()
Base.metadata.create_all(bind=engine)


class Code(BaseModel):
    code: str | None


origins = ["http://localhost:5173", "localhost:5173"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.post("/run")
def run_code(code: Code):
    if not code.code:
        return {"output": ""}
    response = runCode(code.code)
    return response


@app.post("/submit")
def submit_code(request: CodeSchema, db: Session = Depends(get_db)):
    code = CodeItem(code=request.code, output=request.output)
    db.add(code)
    db.commit()
    db.refresh(code)
