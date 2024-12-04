import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EnvelopesService } from '../../services/envelopes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-envelopes',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './envelopes.component.html',
  styleUrl: './envelopes.component.scss'
})
export class EnvelopesComponent implements OnInit, OnDestroy {


  envelopes: any;
  constructor(private envelopesService: EnvelopesService){

  }
  obtenerEnvelopes(){
    this.envelopesService.obtenerEnvelopes().subscribe(
      data => this.envelopes = data, 
      error => console.log(error),
      () => console.log("Fin")
      
    )
  }

  ngOnInit(): void {
    this.obtenerEnvelopes()
  }
  ngOnDestroy(): void {
    console.log("Adios")
  }





}
