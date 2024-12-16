import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private http: HttpClient) {}

  obtenerTransacciones(idEnvelope: number): Observable<any> {
    return this.http.get(`https://api-tecweb-rmf1.onrender.com/api/envelopes/${idEnvelope}/transactions`);
  }

  crearTransaccion(idEnvelope: number, transaccion: any): Observable<any> {
    return this.http.post(`https://api-tecweb-rmf1.onrender.com/api/envelopes/${idEnvelope}/transactions`, transaccion);
  }
}
