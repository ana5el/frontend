import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAa } from '../_models/user-aa';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'blob' as 'json',
  };
  constructor(private http: HttpClient, private message: NzMessageService) {}

  create(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/user`,
      JSON.stringify(request),
      this.httpOptions
    );
  }

  delete(id: number) {
    this.http
      .delete(`${environment.apiUrl}/user/${id}`)
      .subscribe(() =>
        this.message.success(`L'utilisateur supprimé avec succès`)
      );
  }

  update(id: number, user: UserAa): Observable<UserAa> {
    return this.http.put<UserAa>(
      `${environment.apiUrl}/user/${id}`,
      JSON.stringify(user),
      this.httpOptions
    );
  }

  getQrCode(username: string) {
    return this.http.get(`${environment.apiUrl}/user/qr/${username}`, {
      responseType: 'text',
    });
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user`);
  }

  getByUsername(username: string): Observable<UserAa> {
    return this.http.get<UserAa>(
      `${environment.apiUrl}/user/findbyusername/${username}`
    );
  }

  downloadPdf(id: number) {
    this.http
      .post<any>(
        `${environment.apiUrl}/print/userQrCode/${id}`,
        null,
        this._httpOptions
      )
      .subscribe((response) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }
}
