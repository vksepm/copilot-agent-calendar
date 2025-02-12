from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from database import Base

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    location = Column(String(200), nullable=True)
    attendees = Column(Text, nullable=True)  # Store as comma-separated emails
    meeting_type = Column(String(50), nullable=True)  # For color coding
    is_recurring = Column(Boolean, default=False)
    recurrence_pattern = Column(String(100), nullable=True)  # Store recurrence rules
    created_at = Column(DateTime, nullable=True)