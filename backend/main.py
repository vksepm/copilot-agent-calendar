from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

from models import Meeting
import schemas
from database import engine, get_db, Base

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

@app.post("/meetings/", response_model=schemas.Meeting)
async def create_meeting(meeting: schemas.MeetingCreate, db: Session = Depends(get_db)):
    meeting_data = meeting.model_dump()
    db_meeting = Meeting(**meeting_data, created_at=datetime.now())
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)
    return db_meeting

@app.get("/meetings/", response_model=List[schemas.Meeting])
async def get_meetings(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Meeting)
    if start_date and end_date:
        query = query.filter(
            Meeting.start_time >= start_date,
            Meeting.start_time <= end_date
        )
    return query.all()

@app.get("/meetings/{meeting_id}", response_model=schemas.Meeting)
async def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if meeting is None:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

@app.put("/meetings/{meeting_id}", response_model=schemas.Meeting)
async def update_meeting(
    meeting_id: int,
    meeting: schemas.MeetingCreate,
    db: Session = Depends(get_db)
):
    db_meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if db_meeting is None:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    meeting_data = meeting.model_dump()
    for key, value in meeting_data.items():
        setattr(db_meeting, key, value)
    
    db.commit()
    db.refresh(db_meeting)
    return db_meeting

@app.delete("/meetings/{meeting_id}")
async def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if meeting is None:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    db.delete(meeting)
    db.commit()
    return {"message": "Meeting deleted successfully"}