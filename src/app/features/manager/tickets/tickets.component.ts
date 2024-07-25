import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../../services/ticket/ticket-service.service';
import { Ticket } from '../../../interfaces/ticket.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticketForm!: FormGroup;
  tickets: Ticket[] = [];
  searchTerm: string = '';
  selectedTicket: Ticket | null = null;
  showModal = false;
  isEditMode = false;


  constructor(private fb: FormBuilder, private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      ticket_type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(
      (res) => {
        this.tickets = res;
      },
      (error) => {
        console.error('Error loading tickets', error);
      }
    );
  }

  openModal(ticket?: Ticket) {
    if (ticket) {
      this.selectedTicket = ticket;
      this.ticketForm.patchValue(ticket);
      this.isEditMode = true;
    } else {
      this.selectedTicket = null;
      this.ticketForm.reset();
      this.isEditMode = false;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      if (this.isEditMode && this.selectedTicket) {
        this.ticketService.updateTicket(this.selectedTicket.ticket_id!, this.ticketForm.value).subscribe(
          () => {
            this.loadTickets();
            this.closeModal();
          },
          (error) => {
            console.error('Error updating ticket', error);
          }
        );
      } else {
        this.ticketService.createTicket(this.ticketForm.value).subscribe(
          () => {
            this.loadTickets();
            this.closeModal();
          },
          (error) => {
            console.error('Error creating ticket', error);
          }
        );
      }
    }
  }

  onDelete(ticketId: string) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(ticketId).subscribe(
        () => {
          this.loadTickets();
        },
        (error) => {
          console.error('Error deleting ticket', error);
        }
      );
    }
  }
}
