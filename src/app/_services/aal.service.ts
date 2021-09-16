import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aal } from '../_models/aal';
import { TypeAal } from '../_models/type-aal';

@Injectable({
  providedIn: 'root',
})
export class AalService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  create(request: any): Observable<Aal> {
    return this.http.post<Aal>(
      `${environment.apiUrl}/aal`,
      JSON.stringify(request),
      this.httpOptions
    );
  }

  getTypes(): Observable<TypeAal[]> {
    return this.http.get<TypeAal[]>(`${environment.apiUrl}/aal/types`);
  }

  getAll(): Observable<Aal[]> {
    return this.http.get<Aal[]>(`${environment.apiUrl}/aal`);
  }

  getById(id: number): Observable<Aal> {
    return this.http.get<Aal>(`${environment.apiUrl}/aal/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/aal/${id}`);
  }

  update(id: number, aal: Aal): Observable<Aal> {
    return this.http.put<Aal>(
      `${environment.apiUrl}/aal/${id}`,
      JSON.stringify(aal),
      this.httpOptions
    );
  }
}
