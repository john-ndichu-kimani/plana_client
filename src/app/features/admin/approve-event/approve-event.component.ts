import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { EventService } from '../../../services/events/event.service';
import { Event } from '../../../interfaces/event.interface';
import { CommonModule } from '@angular/common';
import { EventPipe } from '../../../shared/search/event.pipe';

@Component({
  selector: 'app-approve-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approve-event.component.html',
  styleUrls: ['./approve-event.component.css']
})
export class ApproveEventComponent implements OnInit {
  events: Event[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  eventsPerPage: number = 6;
  totalPages: number = 1;

  constructor(private eventService: EventService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  searchEvents() {
    const filteredEvents = this.filterEvents();
    this.totalPages = Math.ceil(filteredEvents.length / this.eventsPerPage);
    this.currentPage = 1; // Reset to the first page
    this.events = filteredEvents.slice(0, this.eventsPerPage); // Display first page
  }

   private filterEvents(): Event[] {
    let filteredEvents = this.events;

    if (this.searchTerm) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        || event.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }



    return filteredEvents;
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(res => {
      this.events = res.events;
      this.totalPages = Math.ceil(this.events.length / this.eventsPerPage);
    });
  }

  approveEvent(eventId: string): void {
    this.eventService.approveEvent(eventId).subscribe({
      next: () => this.loadEvents(),
      error: error => console.error('Error approving event', error)
    });
  }

  rejectEvent(eventId: string): void {
    this.eventService.rejectEvent(eventId).subscribe({
      next: () => this.loadEvents(),
      error: error => console.error('Error rejecting event', error)
    });
  }
}
