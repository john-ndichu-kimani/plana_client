import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../../interfaces/ticket.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // private apiUrl = 'http://localhost:3002/tickets';
  private apiUrl = `${environment.baseURL}/tickets`

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
  }

  createTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.post<{message?: string, error?: string}>(`${this.apiUrl}/create`, ticket, httpOptions);
  }

  getAllTickets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTicket(ticketId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ticketId}`);
  }

  getEventTickets(eventId: string): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.get(`${this.apiUrl}/event/${eventId}/tickets`, httpOptions);
  }

  updateTicket(ticketId: string, ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.put<{message?: string, error?: string}>(`${this.apiUrl}/${ticketId}`, ticket, httpOptions);
  }

  deleteTicket(id: string): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.delete<{message?: string, error?: string}>(`${this.apiUrl}/${id}`, httpOptions);
  }

  bookTicket(bookingDetails: { ticket_id: string; number_of_tickets: number }): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.post<{message?: string, error?: string}>(`${this.apiUrl}/book/`, bookingDetails, httpOptions);
  }

  cancelBooking(ticketId: string): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.patch(`${this.apiUrl}/cancel/${ticketId}`, {}, httpOptions);
  }

  getUserBookingHistory(): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.get(`${this.apiUrl}/user/bookings`, httpOptions);
  }
}
