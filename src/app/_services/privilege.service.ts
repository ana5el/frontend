import { Privilege } from './../_models/privilege';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  create(p: Privilege): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/privileges`,
      JSON.stringify(p),
      this.httpOptions
    );
  }
  getAll(): Observable<Privilege[]> {
    return this.http.get<Privilege[]>(`${environment.apiUrl}/api/privileges`);
  }

  getById(id: number): Observable<Privilege> {
    return this.http.get<Privilege>(
      `${environment.apiUrl}/api/privileges/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/privileges/${id}`);
  }

  update(id: number, p: Privilege): Observable<Privilege> {
    return this.http.put<Privilege>(
      `${environment.apiUrl}/api/privileges/${id}`,
      JSON.stringify(p),
      this.httpOptions
    );
  }
}
