import { Routes } from '@angular/router';
import { Veiculolist } from './veiculo/veiculolist/veiculolist';
import { Clientelist } from './cliente/clientelist/clientelist';

export const routes: Routes = [
  { 
    path: 'veiculos', 
    component: Veiculolist
  },
  
  { 
    path: 'clientes', 
    component: Clientelist
  },

  { 
    path: '', 
    redirectTo: '/veiculos', 
    pathMatch: 'full' 
  }
];