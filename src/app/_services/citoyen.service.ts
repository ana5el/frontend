import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitoyenService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  create(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/citoyen`,
      JSON.stringify(request),
      this.httpOptions
    );
  }
}
