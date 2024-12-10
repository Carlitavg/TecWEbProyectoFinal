import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnvelopesService } from '../../services/envelopes.service';
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-envelopes',
  templateUrl: './envelopes.component.html',
  styleUrls: ['./envelopes.component.scss']
})
export class EnvelopesComponent implements OnInit, OnDestroy {
  envelopes: any[] = [];
  nuevoEnvelope = {
    name: '',
    limit: 0
  };
  modalAbierto: boolean = false;

  transaccionesVisible: boolean = false;
  transacciones: any[] = [];
  idEnvelopeSeleccionado: number | null = null;

  crearTransaccionModalVisible: boolean = false;
  nuevaTransaccion = {
    amount: 0,
    description: ''
  };

  constructor(
    private envelopesService: EnvelopesService,
    private transaccionesService: TransaccionesService
  ) {}

  obtenerEnvelopes() {
    this.envelopesService.obtenerEnvelopes().subscribe(
      (data: any) => {
        this.envelopes = data.envelopes;
      },
      error => console.log(error)
    );
  }

  onNombreChange(event: any): void {
    this.nuevoEnvelope.name = event.target.value;
  }

  onLimiteChange(event: any): void {
    this.nuevoEnvelope.limit = parseFloat(event.target.value);
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  crearEnvelope() {
    this.envelopesService.crearEnvelope(this.nuevoEnvelope).subscribe(
      (data: any) => {
        this.envelopes.push(data);
        this.cerrarModal();
      },
      error => console.log(error)
    );
  }

  verTransacciones(idEnvelope: number) {
    this.idEnvelopeSeleccionado = idEnvelope;
    this.transaccionesService.obtenerTransacciones(idEnvelope).subscribe(
      (data: any) => {
        this.transacciones = data.transactions;
        this.transaccionesVisible = true;
      },
      error => console.log(error)
    );
  }

  cerrarTransacciones() {
    this.transaccionesVisible = false;
    this.idEnvelopeSeleccionado = null;
  }

  abrirModalTransaccion(idEnvelope: number) {
    this.idEnvelopeSeleccionado = idEnvelope;
    this.crearTransaccionModalVisible = true;
  }

  cerrarModalTransaccion() {
    this.crearTransaccionModalVisible = false;
  }

  onAmountChange(event: any): void {
    this.nuevaTransaccion.amount = parseFloat(event.target.value);
  }

  onDescriptionChange(event: any): void {
    this.nuevaTransaccion.description = event.target.value;
  }

  // Actualizamos el 'spent' después de crear la transacción
  crearTransaccion() {
    if (this.nuevaTransaccion.amount <= 0 || !this.nuevaTransaccion.description) {
      console.log("Por favor, complete todos los campos.");
      return;
    }
  
    const transaccion = {
      amount: this.nuevaTransaccion.amount,
      description: this.nuevaTransaccion.description
    };
  
    // Realizamos la solicitud POST para crear la transacción
    this.transaccionesService.crearTransaccion(this.idEnvelopeSeleccionado!, transaccion).subscribe(
      (data: any) => {
        // Ahora, actualizamos el 'spent' de la transacción en el envelope correspondiente
        const envelope = this.envelopes.find(e => e.id === this.idEnvelopeSeleccionado);
        if (envelope) {
          // Aseguramos que 'spent' sea un número y sumamos el amount
          envelope.spent = parseFloat(envelope.spent.toString()) + parseFloat(this.nuevaTransaccion.amount.toString());
          // Redondeamos el resultado a 2 decimales para evitar problemas de precisión
          envelope.spent = Math.round(envelope.spent * 100) / 100;
        }
  
        this.transacciones.push(data); // Agregar la transacción a la lista
        this.cerrarModalTransaccion(); // Cerrar el modal
        console.log("Transacción creada exitosamente.");
      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.obtenerEnvelopes();
  }

  ngOnDestroy(): void {
    console.log("Adiós");
  }
}
