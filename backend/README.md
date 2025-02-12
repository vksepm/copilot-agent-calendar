# Calendar Application Backend

This is the backend service for the Calendar Application built with FastAPI and SQLAlchemy.

## API Documentation

### Meeting Object Structure

```json
{
  "id": 1,
  "title": "Team Meeting",
  "description": "Weekly sync meeting",
  "start_time": "2024-02-20T10:00:00",
  "end_time": "2024-02-20T11:00:00",
  "location": "Conference Room A",
  "attendees": "john@example.com, jane@example.com",
  "meeting_type": "work",
  "is_recurring": true,
  "recurrence_pattern": "weekly",
  "created_at": "2024-02-19T15:00:00"
}
```

### Endpoints

#### GET /meetings/
Get all meetings. Supports optional query parameters for date filtering.

Query Parameters:
- `start_date`: ISO datetime string
- `end_date`: ISO datetime string

#### POST /meetings/
Create a new meeting. Requires meeting details in request body.

Required fields:
- `title`
- `start_time`
- `end_time`

Optional fields:
- `description`
- `location`
- `attendees`
- `meeting_type`
- `is_recurring`
- `recurrence_pattern`

#### GET /meetings/{meeting_id}
Get details of a specific meeting.

#### PUT /meetings/{meeting_id}
Update an existing meeting. Accepts the same fields as POST.

#### DELETE /meetings/{meeting_id}
Delete a specific meeting.

## Database Schema

### Meetings Table
```sql
CREATE TABLE meetings (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location VARCHAR(200),
    attendees TEXT,
    meeting_type VARCHAR(50),
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern VARCHAR(100),
    created_at DATETIME
);
```

## Development Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the development server:
```bash
uvicorn main:app --reload --port 8000
```

3. Access the API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

No environment variables are required for development as the application uses SQLite by default. For production, consider configuring:

- `DATABASE_URL`: Database connection string
- `CORS_ORIGINS`: Allowed CORS origins
- `API_KEY`: For authentication (future implementation)

## Testing

To implement tests (future enhancement):
```bash
pytest tests/
```

## Error Handling

The API implements standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Each error response includes a detail message explaining the issue.