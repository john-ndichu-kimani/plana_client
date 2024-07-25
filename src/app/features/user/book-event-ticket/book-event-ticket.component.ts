// book-event-ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/events/event.service';
import { TicketService } from '../../../services/ticket/ticket-service.service';
import { Event } from '../../../interfaces/event.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../interfaces/ticket.interface';

@Component({
  selector: 'app-book-event-ticket',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './book-event-ticket.component.html',
  styleUrls: ['./book-event-ticket.component.css']
})
// book-event-ticket.component.ts
export class BookEventTicketComponent implements OnInit {
  event!: Event;
  numberOfTickets: number = 1;
  ticketForm!: FormGroup;
  availableTickets: Ticket[] = [];
  ticketPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private ticketService: TicketService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('event_id') as string;

    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (res: Event) => {
          this.event = res;
          this.fetchAvailableTickets(eventId);
          this.initializeForm();
        },
        error: (err) => {
          console.error('Error fetching event:', err);
        }
      });
    }
  }

  fetchAvailableTickets(event_id:string){
    this.ticketService.getEventTickets(event_id).subscribe(res=>{
      this.availableTickets=res
      console.log(res);

    })
  }
  initializeForm(): void {
    this.ticketForm = this.fb.group({
      ticket_id: [null, Validators.required],
      number_of_tickets: [1, [Validators.required, Validators.min(1)]],
      emails: ['']
    });

    this.ticketForm.get('number_of_tickets')?.valueChanges.subscribe(value => {
      this.updateTicketPrice(value);
    });
  }

  updateTicketPrice(numberOfTickets: number): void {
    const ticketId = this.ticketForm.get('ticket_id')?.value;
    if (ticketId) {
      const selectedTicket = this.availableTickets.find(ticket => ticket.ticket_id === ticketId);
      this.ticketPrice = selectedTicket ? selectedTicket.price * numberOfTickets : 0;
    }
  }

  bookTicket(): void {
    if (this.ticketForm.valid) {
      const bookingDetails = {
        ticket_id: this.ticketForm.get('ticket_id')?.value,
        number_of_tickets: this.ticketForm.get('number_of_tickets')?.value,
        emails: this.ticketForm.get('emails')?.value.split(',')
      };

      this.ticketService.bookTicket(bookingDetails).subscribe({
        next: (response) => {
          if (response.message) {
            this.router.navigate(['/user/bookings']);
          } else {
            console.error('Booking error:', response.error);
          }
        },
        error: (err) => {
          console.error('Error booking ticket:', err);
        }
      });
    }
  }
}
