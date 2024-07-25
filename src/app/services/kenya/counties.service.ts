import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountyService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search?country=Kenya&format=json&addressdetails=1';

  constructor(private http: HttpClient) {}

  getCounties(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data =>
        data
          .filter(item => item.address && item.address.state)
          .map(item => item.address.state)
          .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
      )
    );
  }
}
