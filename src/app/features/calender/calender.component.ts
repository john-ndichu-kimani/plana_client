import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventApi, EventSourceInput } from '@fullcalendar/core';
import { Event } from '../../interfaces/event.interface';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule,CalenderComponent,FullCalendarModule],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnChanges {
  @Input() events: Event[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: []  // Initialize as empty or default values
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      this.updateCalendarEvents();
    }
  }

  updateCalendarEvents(): void {
    this.calendarOptions.events = this.events.map(event => ({
      title: event.title,
      date: event.date
      // Add any other necessary properties here
    }));
  }

  handleEventClick(info: any): void {
    console.log('Event clicked:', info.event.title);
  }
}
