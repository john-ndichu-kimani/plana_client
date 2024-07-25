import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { EventService } from '../../../services/events/event.service';
import { Event } from '../../../interfaces/event.interface';
import { CalenderComponent } from '../../calender/calender.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,CalenderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  upcomingEvents$: Observable<Event[]> = of([]);
  pastEvents$: Observable<Event[]> = of([]);
  attendees$: Observable<number> = of(0);
  locations$: Observable<string[]> = of([]);
  calendarEvents$: Observable<Event[]> = of([]);

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEventSummaries();
    this.loadAttendeesSummary();
    this.loadLocationsSummary();
    this.loadCalendarEvents();
  }

  loadEventSummaries(): void {
    this.eventService.getEvents().pipe(
      map(events => {
        const today = new Date();
        const upcoming = events.filter((event: { date: string | number | Date; }) => new Date(event.date) > today);
        const past = events.filter((event: { date: string | number | Date; }) => new Date(event.date) <= today);
        this.upcomingEvents$ = of(upcoming);
        this.pastEvents$ = of(past);
      })
    ).subscribe();
  }

  loadAttendeesSummary(): void {
    // Replace with your actual implementation to fetch attendees count
    this.attendees$ = of(100); // Example static value
  }

  loadLocationsSummary(): void {
    // Replace with your actual implementation to fetch locations
    this.locations$ = of(['Location 1', 'Location 2', 'Location 3']); // Example static values
  }

  loadCalendarEvents(): void {
    this.eventService.getEvents().pipe(
      map(events => {
        // Ensure events are in a proper format for the calendar
        this.calendarEvents$ = of(events);
      })
    ).subscribe();
  }
}
