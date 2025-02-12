# Calendar Application

🤖 Developed with [GitHub Copilot](https://github.com/features/copilot) - Your AI pair programming companion

A full-stack calendar application built with React, TypeScript, and FastAPI that allows users to manage meetings and events efficiently.

## Features

- 📅 Interactive calendar interface with month, week, day, and list views
- ✨ Create, edit, and delete meetings
- 🎨 Color-coded events based on meeting type (work, personal, important)
- 📍 Location tracking for meetings
- 👥 Support for multiple attendees
- 🔄 Basic recurring meeting support
- 📱 Responsive design with Tailwind CSS
- ⚡ Real-time updates when creating/editing meetings
- 🚀 Fast and efficient backend API with SQLite database

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- FullCalendar
- Tailwind CSS
- Headless UI
- Axios
- ESLint

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- CORS middleware

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000

## API Endpoints

- GET `/meetings/` - Get all meetings
- GET `/meetings/{meeting_id}` - Get a specific meeting
- POST `/meetings/` - Create a new meeting
- PUT `/meetings/{meeting_id}` - Update an existing meeting
- DELETE `/meetings/{meeting_id}` - Delete a meeting

## Project Structure

```
├── backend/
│   ├── main.py           # FastAPI application and routes
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   └── database.py       # Database configuration
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── types/       # TypeScript types
│   │   └── styles/      # CSS styles
│   └── public/          # Static assets
```

## Development

### Adding New Features
1. Create new components in `frontend/src/components`
2. Add new API endpoints in `backend/main.py`
3. Update database models in `backend/models.py`
4. Add corresponding schemas in `backend/schemas.py`

### Code Style
- Frontend follows ESLint configuration
- Backend follows PEP 8 guidelines

## Roadmap

### Short-term
1. 🔒 User authentication and authorization
2. 📧 Email notifications for meeting invites
3. 🔄 Advanced recurring meeting patterns
4. 🌍 Timezone support
5. 📱 Mobile-optimized views

### Mid-term
1. 📊 Calendar analytics and insights
2. 🤝 Team calendar support
3. 🔍 Advanced search and filtering
4. 📎 File attachments for meetings
5. 🔗 Integration with external calendars (Google, Outlook)

### Long-term
1. 🌐 Multi-language support
2. 🤖 AI-powered scheduling assistant
3. 📱 Native mobile applications
4. 🔄 Real-time collaboration features
5. 🎨 Customizable themes and layouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.