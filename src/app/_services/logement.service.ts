import { TypeLogement } from './../_models/type-logement';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Logement } from '../_models/logement';

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  create(request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/logements`,
      JSON.stringify(request),
      this.httpOptions
    );
  }

  getTypes(): Observable<TypeLogement[]> {
    return this.http.get<TypeLogement[]>(
      `${environment.apiUrl}/logements/types`
    );
  }

  getImmeubles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/logements/immeubles`);
  }

  getVillas(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/logements/villas`);
  }

  getMaisons(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/logements/maisons`);
  }

  // update(id: number, logement: Logement): Observable<Logement> {
  //   return this.http.put(
  //     `${environment.apiUrl}/logements/${id}`,
  //     JSON.stringify(logement),
  //     new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     })
  //   );
  // }
}
