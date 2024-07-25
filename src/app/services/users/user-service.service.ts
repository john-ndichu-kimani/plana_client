import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';

export interface RequestManager {
  request_id: string;
  user_id: string;
  status: string;
  requested_at: string;
  approved_at: string | null;
  user: {
    username: string;
    email: string;
    phone_number: string;
  };}

@Injectable({
  providedIn: 'root'
})

export class UserService {


  private baseUrl = 'http://localhost:3002/user';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
  }

  getUserProfile(): Observable<{profile:User}> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.get<{profile:User}>(`${this.baseUrl}/profile`, httpOptions);
  }

  updateProfile(profile: User): Observable<{ message: string, updatedProfile: User }> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };

    return this.http.put<{ message: string, updatedProfile: User }>(`${this.baseUrl}/profile`, profile, httpOptions);
  }


  assignRole(user_id: string, role: 'event_attendee' | 'manager' | 'super_admin'): Observable<any> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.post<any>(`${this.baseUrl}/${user_id}/role`, { role }, httpOptions);
  }


  requestToBeManager(): Observable<{message?:string,error?:string}> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.post<{message?: string, error?: string}>(`${this.baseUrl}/request-manager`, {}, httpOptions);
  }



  getToBeManagerRequests(): Observable<RequestManager[]> {
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.get<RequestManager[]>(`${this.baseUrl}/manager-requests`, httpOptions);
  }


  approveManagerRequest(requestId: string): Observable<any>{
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.patch<any>(`${this.baseUrl}/requests/${requestId}/approve`, httpOptions);
  }

  rejectManagerRequest(requestId: string): Observable<any>{
    const httpOptions = {
      headers: this.getAuthHeaders()
    };
    return this.http.post<any>(`requests/${this.baseUrl}/reject`, httpOptions);
  }

}
