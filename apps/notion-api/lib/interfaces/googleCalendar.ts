interface Attendee {
  self: boolean
  responseStatus: 'declined' | 'needsAction' | 'accepted'
}

interface GoogleCalendarEvent {
  htmlLink: string
  summary: string
  start: {
    dateTime: string
  }
  end: {
    dateTime: string
  }
  organizer: {
    self: boolean
  }
  attendees?: Attendee[]
}

export interface GoogleCalendarsResponse {
  items: GoogleCalendarEvent[]
}
