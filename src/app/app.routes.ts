import { Routes } from '@angular/router';
import { EnvelopesComponent } from './paginas/envelopes/envelopes.component';

export const routes: Routes = [
    { path: '', redirectTo: '/envelopes', pathMatch: 'full' },
    {path: 'envelopes', component:EnvelopesComponent},
];
