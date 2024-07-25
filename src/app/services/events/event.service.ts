import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from '../../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3002/events';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');


    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
  }

  createEvent(eventData:Partial< Event>): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.post(`${this.apiUrl}/create`,eventData, httpOptions);
  }


  // Get all events
  getEvents(): Observable<{ events: Event[] }> {
    return this.http.get<{ events: Event[] }>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError<{ events: Event[] }>('getEvents'))
    );
  }

  // Get an event by ID
  getEventById(event_id: string): Observable<Event> {
    return this.http
      .get<Event>(`${this.apiUrl}/${event_id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError<Event>(`getEventById id=${event_id}`)));
  }

  // Update an event
  updateEvent(event_id: string, updatedEvent: Event): Observable<Event> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http
      .put<Event>(`${this.apiUrl}/${event_id}`, updatedEvent, httpOptions)
      .pipe(catchError(this.handleError<any>('updateEvent')));
  }

  // Delete an event
  deleteEvent(event_id: string): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http
      .delete<any>(`${this.apiUrl}/${event_id}`, httpOptions)
      .pipe(catchError(this.handleError<any>('deleteEvent')));
  }

  // Approve an event
  approveEvent(event_id: string): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http
      .put<{ message?: string; error?: string }>(`${this.apiUrl}/${event_id}/approve`, {}, httpOptions)
      .pipe(catchError(this.handleError<any>('/approve')));
  }

  // Reject an event
  rejectEvent(event_id: string): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http
      .put<{ message?: string; error?: string }>(`${this.apiUrl}/${event_id}/reject`, {}, httpOptions)
      .pipe(catchError(this.handleError<any>('rejectEvent')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
