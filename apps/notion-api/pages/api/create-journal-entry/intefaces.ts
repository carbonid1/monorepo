export interface CalendarEvent {
  url: string
  name: string
  date: {
    start: string
    end: string
  }
}

export interface RequestBody {
  settleEvents: CalendarEvent[]
  celebrationEvents: CalendarEvent[]
}
