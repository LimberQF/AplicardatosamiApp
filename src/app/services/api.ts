import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  actualizarUbicacionPallet(palletId: number, nuevaUbicacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${palletId}`, nuevaUbicacion);
  }
}
