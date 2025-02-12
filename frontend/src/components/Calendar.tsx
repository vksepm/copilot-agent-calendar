import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/core';
import axios from 'axios';
import { Meeting, MeetingFormData } from '../types/meeting';
import MeetingForm from './MeetingForm';

const Calendar: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEventColor = (type?: string): string => {
    switch (type) {
      case 'important':
        return '#DC2626';
      case 'personal':
        return '#2563EB';
      case 'work':
        return '#059669';
      default:
        return '#4B5563';
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/meetings/');
      setMeetings(response.data);
    } catch (error) {
      setError('Failed to load meetings. Please try again later.');
      console.error('Error fetching meetings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const startTime = selectInfo.start;
    const endTime = selectInfo.end;

    setSelectedMeeting(null);
    setIsFormOpen(true);
    
    const initialData: Partial<MeetingFormData> = {
      start_time: startTime.toISOString().slice(0, 16),
      end_time: endTime.toISOString().slice(0, 16),
    };
    setSelectedMeeting({ ...initialData } as any);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const meeting = meetings.find(m => m.id.toString() === clickInfo.event.id);
    if (meeting) {
      const formattedMeeting = {
        ...meeting,
        start_time: new Date(meeting.start_time).toISOString().slice(0, 16),
        end_time: new Date(meeting.end_time).toISOString().slice(0, 16),
      };
      setSelectedMeeting(formattedMeeting);
      setIsFormOpen(true);
    }
  };

  const handleSubmit = async (formData: MeetingFormData) => {
    setError(null);
    try {
      if (selectedMeeting?.id) {
        await axios.put(`http://localhost:8000/meetings/${selectedMeeting.id}`, formData);
      } else {
        await axios.post('http://localhost:8000/meetings/', formData);
      }
      setIsFormOpen(false);
      setSelectedMeeting(null);
      await fetchMeetings();
    } catch (error) {
      setError('Failed to save meeting. Please try again.');
      console.error('Error saving meeting:', error);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/meetings/${id}`);
      setIsFormOpen(false);
      setSelectedMeeting(null);
      await fetchMeetings();
    } catch (error) {
      setError('Failed to delete meeting. Please try again.');
      console.error('Error deleting meeting:', error);
    }
  };

  const events: EventInput[] = meetings.map(meeting => ({
    id: meeting.id.toString(),
    title: meeting.title,
    start: meeting.start_time,
    end: meeting.end_time,
    backgroundColor: getEventColor(meeting.meeting_type),
    extendedProps: {
      description: meeting.description,
      location: meeting.location,
      attendees: meeting.attendees
    }
  }));

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;
    return (
      <div className="event-content" title={`
        ${event.title}
        ${event.extendedProps.description ? `\nDescription: ${event.extendedProps.description}` : ''}
        ${event.extendedProps.location ? `\nLocation: ${event.extendedProps.location}` : ''}
        ${event.extendedProps.attendees ? `\nAttendees: ${event.extendedProps.attendees}` : ''}
      `.trim()}>
        <div className="event-title">{event.title}</div>
        {event.extendedProps.location && (
          <div className="event-location text-xs opacity-75">📍 {event.extendedProps.location}</div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex-1">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="inline-flex items-center">
              <svg className="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Loading calendar...
            </div>
          </div>
        )}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          height="100%"
        />
      </div>

      <MeetingForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedMeeting(null);
        }}
        onSubmit={handleSubmit}
        onDelete={selectedMeeting?.id ? () => handleDelete(selectedMeeting.id) : undefined}
        initialData={selectedMeeting || undefined}
      />
    </div>
  );
};

export default Calendar;
