import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit, OnDestroy {
  @Input() envelopeId: number | null = null;  // Recibe el ID del sobre
  transactions: any[] = [];

  constructor(private transactionsService: TransaccionesService) {}

  obtenerTransactions() {
    if (this.envelopeId !== null) {
      this.transactionsService.obtenerTransactions().subscribe(
        (data: any) => {
          // Filtrar las transacciones por envelopeId
          this.transactions = data.transacciones.filter(
            (transaction: any) => transaction.id_envelope === this.envelopeId
          );
        },
        error => console.log(error),
        () => console.log("Fin")
      );
    }
  }

  ngOnInit(): void {
    this.obtenerTransactions();
  }

  ngOnDestroy(): void {
    console.log("Adiós");
  }
}
