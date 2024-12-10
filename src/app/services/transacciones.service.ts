import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private http: HttpClient) {}

  obtenerTransacciones(idEnvelope: number): Observable<any> {
    return this.http.get(`http://localhost:4001/api/envelopes/${idEnvelope}/transactions`);
  }

  crearTransaccion(idEnvelope: number, transaccion: any): Observable<any> {
    return this.http.post(`http://localhost:4001/api/envelopes/${idEnvelope}/transactions`, transaccion);
  }
}
