import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profile } from './../_models/profile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  constructor(private http: HttpClient) {}

  create(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(
      `${environment.apiUrl}/profiles`,
      JSON.stringify(profile),
      this.httpOptions
    );
  }

  getById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/profiles/${id}`);
  }

  getAll(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.apiUrl}/profiles`);
  }

  update(id: number, p: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      `${environment.apiUrl}/profiles/${id}`,
      JSON.stringify(p),
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/profiles/${id}`);
  }
}
