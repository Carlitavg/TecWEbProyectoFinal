import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvelopesService {

  constructor(private http: HttpClient) {}

  obtenerEnvelopes(){
    return this.http.get("http://localhost:4001/api/envelopes")
  }
}
