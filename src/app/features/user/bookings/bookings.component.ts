import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket-service.service';
import { BookingHistory } from '../../../interfaces/booking.history.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: BookingHistory[] = [];
  showCancelModal: boolean = false;
  cancelTicketId: string | null = null;
  successMsg:string = '';
  success:boolean=false;
  errorMsg:string='';
  error:boolean=false;

  constructor(private bookingService: TicketService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getUserBookingHistory().subscribe((res)=>{
      this.bookings = res
      console.log(res);
    })
  }

  openCancelModal(ticketId: string): void {
    this.cancelTicketId = ticketId;
    this.showCancelModal = true;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
    this.cancelTicketId = null;
  }

  confirmCancel(): void {
    if (this.cancelTicketId) {
      this.bookingService.cancelBooking(this.cancelTicketId).subscribe(
        response => {
          this.success=true
          this.successMsg='Booking cancelled successfully.';
          this.getBookings();  // Refresh the bookings list
          this.closeCancelModal();
          setTimeout(()=>{
            this.successMsg='';
            this.success=false
          },3000)
        },
        error => {
          error=true
          this.errorMsg='Failed to cancel booking.';
          this.closeCancelModal();
          setTimeout(()=>{
            this.successMsg='';
            error=false
          },3000)
        }
      );
    }
  }
}
