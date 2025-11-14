import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';
import { Veiculoform } from '../veiculoform/veiculoform';
import { Fotosveiculos } from '../fotosveiculos/fotosveiculos';

@Component({
  selector: 'app-veiculolist',
  standalone: true, 
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    Fotosveiculos
  ],
  templateUrl: './veiculolist.html',
  styleUrls: ['./veiculolist.css']
})
export class Veiculolist implements OnInit {
  displayedColumns: string[] = ['modelo', 'marca', 'ano', 'placa', 'status', 'acoes'];
  veiculos: Veiculo[] = [];

  constructor(
    private veiculoService: VeiculoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.veiculoService.getVeiculos().subscribe(dados => {
      this.veiculos = dados;
    });
  }

  abrirFormulario(): void {
    const dialogRef = this.dialog.open(Veiculoform, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { this.carregarVeiculos(); }
    });
  }

  abrirFormularioEdicao(veiculo: Veiculo): void {
    const dialogRef = this.dialog.open(Veiculoform, {
      width: '500px',
      data: veiculo
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) { this.carregarVeiculos(); }
    });
  }

  deletarVeiculo(id: number): void {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      this.veiculoService.deleteVeiculo(id).subscribe({
        next: () => {
          console.log('Veículo deletado com sucesso!');
          this.carregarVeiculos(); 
        },
        error: (err) => console.error('Erro ao deletar veículo:', err)
      });
    }
  }

  abrirGaleria(urls: string): void {
    this.dialog.open(Fotosveiculos, {
      width: '80vw',
      maxWidth: '800px',
      data: urls
    });
  }

}