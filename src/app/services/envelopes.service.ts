import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvelopesService {

  constructor(private http: HttpClient) {}

  obtenerEnvelopes(): Observable<any> {
    return this.http.get("http://localhost:4001/api/envelopes/");
  }

  crearEnvelope(envelope: any): Observable<any> {
    return this.http.post("http://localhost:4001/api/envelopes", envelope);
  }
}
