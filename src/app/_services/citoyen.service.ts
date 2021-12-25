import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Citoyen } from '../_models/citoyen';

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

  getAll(): Observable<Citoyen[]> {
    return this.http.get<Citoyen[]>(`${environment.apiUrl}/citoyen`);
  }

  exportExcel() {
    return this.http.get<any>(`${environment.apiUrl}/citoyen/export/excel`, {});
  }

  downloadFile(filename?: string) {
    this.http
      .get(`${environment.apiUrl}/citoyen/export/excel`, {
        responseType: 'blob' as 'json',
      })
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
}
