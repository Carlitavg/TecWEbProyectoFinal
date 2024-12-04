import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private http: HttpClient) {}

  obtenerTransactions(){
    return this.http.get("http://localhost:4001/api/envelopes/1/transactions")
  }
}
