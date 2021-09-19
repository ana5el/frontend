import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from '../_models/grade';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  create(request: Grade): Observable<Grade> {
    return this.http.post<Grade>(
      `${environment.apiUrl}/grades`,
      JSON.stringify(request),
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/grades/${id}`);
  }

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${environment.apiUrl}/grades`);
  }
}
