export interface Meeting {
    id: number;
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    location?: string;
    attendees?: string;
    meeting_type?: string;
    is_recurring: boolean;
    recurrence_pattern?: string;
    created_at: string;
}

export interface MeetingFormData {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
    location?: string;
    attendees?: string;
    meeting_type?: string;
    is_recurring: boolean;
    recurrence_pattern?: string;
}