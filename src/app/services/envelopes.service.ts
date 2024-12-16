import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvelopesService {

  constructor(private http: HttpClient) {}

  obtenerEnvelopes(): Observable<any> {
    return this.http.get("https://api-tecweb-rmf1.onrender.com/api/envelopes/");
  }

  crearEnvelope(envelope: any): Observable<any> {
    return this.http.post("https://api-tecweb-rmf1.onrender.com/api/envelopes", envelope);
  }
}
