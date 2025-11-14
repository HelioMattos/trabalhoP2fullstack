import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fotosveiculos',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './fotosveiculos.html',
  styleUrls: ['./fotosveiculos.css']
})
export class Fotosveiculos implements OnInit {

  listaDeUrls: string[] = [];

  imagemSelecionadaIndex: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<Fotosveiculos>
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.listaDeUrls = this.data
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    }
  }

  get imagemAmpliadaUrl(): string | null {
    if (this.imagemSelecionadaIndex === null) {
      return null;
    }
    return this.listaDeUrls[this.imagemSelecionadaIndex];
  }

  selecionarImagem(index: number): void {
    this.imagemSelecionadaIndex = index;
  }

  fecharImagem(): void {
    this.imagemSelecionadaIndex = null;
  }

  proximaImagem(): void {
    if (this.imagemSelecionadaIndex === null) return;

    let novoIndex = this.imagemSelecionadaIndex + 1;

    if (novoIndex >= this.listaDeUrls.length) {
      novoIndex = 0; 
    }
    
    this.imagemSelecionadaIndex = novoIndex;
  }

  imagemAnterior(): void {
    if (this.imagemSelecionadaIndex === null) return;

    let novoIndex = this.imagemSelecionadaIndex - 1;

    if (novoIndex < 0) {
      novoIndex = this.listaDeUrls.length - 1; 
    }

    this.imagemSelecionadaIndex = novoIndex;
  }

  fechar(): void {
    this.dialogRef.close();
  }
}