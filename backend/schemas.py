from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List

class MeetingBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    attendees: Optional[str] = None  # Comma-separated emails
    meeting_type: Optional[str] = None
    is_recurring: bool = False
    recurrence_pattern: Optional[str] = None

class MeetingCreate(MeetingBase):
    pass

class Meeting(MeetingBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)  # Updated for Pydantic v2