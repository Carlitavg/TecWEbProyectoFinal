import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnvelopesService } from '../../services/envelopes.service';
import { TransaccionesComponent } from '../transacciones/transacciones.component'; // Asegúrate de que esta ruta sea correcta
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-envelopes',
  standalone: true,
  imports: [TransaccionesComponent],  // Importamos el componente TransaccionesComponent
  templateUrl: './envelopes.component.html',
  styleUrls: ['./envelopes.component.scss']
})
export class EnvelopesComponent implements OnInit, OnDestroy {

  envelopes: any[] = [];
  showTransactions: boolean = false;  // Controla si mostramos las transacciones
  currentEnvelopeId: number | null = null;  // ID del sobre actual para obtener transacciones
  transactions: any[] = []; 

  constructor(private envelopesService: EnvelopesService, private transaccionesService: TransaccionesService) {}

  obtenerEnvelopes() {
    this.envelopesService.obtenerEnvelopes().subscribe(
      (data: any) => { this.envelopes = data.envelopes },
      error => console.log(error),
      () => console.log("Fin")
    );
  }

  ngOnInit(): void {
    this.obtenerEnvelopes();
  }

  ngOnDestroy(): void {
    console.log("Adiós");
  }

  // Función para obtener las transacciones de un sobre específico
  obtenerTransacciones(envelopeId: number) {
    this.transaccionesService.obtenerTransactions().subscribe(
      (data: any) => {
        this.transactions = data.transacciones.filter(
          (transaction: any) => transaction.id_envelope === envelopeId
        );
      },
      error => console.log(error),
      () => console.log("Datos de transacciones cargados")
    );
  }

  // Función para manejar el click en "Ver transacciones"
  verTransacciones(envelopeId: number) {
    this.showTransactions = true;
    this.currentEnvelopeId = envelopeId;
  }

}
