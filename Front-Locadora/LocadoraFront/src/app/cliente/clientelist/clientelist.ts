import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { Clienteform } from '../clienteform/clienteform';

@Component({
  selector: 'app-clientelist',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,

  ],
  templateUrl: './clientelist.html',
  styleUrls: ['./clientelist.css']
})
export class Clientelist implements OnInit {

  displayedColumns: string[] = ['nome', 'cpf', 'telefone', 'email', 'acoes'];
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe(dados => {
      this.clientes = dados;
    });
  }

  abrirFormulario(): void {
    const dialogRef = this.dialog.open(Clienteform, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carregarClientes();
      }
    });
  }

  abrirFormularioEdicao(cliente: Cliente): void {
    const dialogRef = this.dialog.open(Clienteform, {
      width: '600px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carregarClientes();
      }
    });
  }

  deletarCliente(id: number): void {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => {
          console.log('Cliente deletado com sucesso!');
          this.carregarClientes();
        },
        error: (err) => console.error('Erro ao deletar cliente:', err)
      });
    }
  }

}