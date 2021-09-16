import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAa } from '../_models/user-aa';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  create(request: any): Observable<UserAa> {
    return this.http.post<UserAa>(
      `${environment.apiUrl}/user`,
      JSON.stringify(request),
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  update(id: number, user: UserAa): Observable<UserAa> {
    return this.http.put<UserAa>(
      `${environment.apiUrl}/user/${id}`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  getAll(): Observable<UserAa[]> {
    return this.http.get<UserAa[]>(`${environment.apiUrl}/user`);
  }

  getByUsername(username: string): Observable<UserAa> {
    return this.http.get<UserAa>(
      `${environment.apiUrl}/user/findbyusername/${username}`
    );
  }
}
