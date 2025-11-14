import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-veiculoform',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './veiculoform.html',
  styleUrls: ['./veiculoform.css']
})
export class Veiculoform implements OnInit {

  veiculoForm!: FormGroup;
  isEditMode = false;
  tituloFormulario = 'Cadastrar Novo Veículo';

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    public dialogRef: MatDialogRef<Veiculoform>,
    @Inject(MAT_DIALOG_DATA) public data: Veiculo 
  ) { }

  ngOnInit(): void {
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: [null, Validators.required],
      placa: ['', Validators.required],
      valorDiaria: [null, Validators.required],
      imagemUrl: ['', Validators.required]
    });

    if (this.data) {
      this.isEditMode = true;
      this.tituloFormulario = 'Editar Veículo';
      const urlsParaTextarea = this.data.imagemUrl.split(',').join('\n');
      this.veiculoForm.patchValue(this.data);
      this.veiculoForm.patchValue({ imagemUrl: urlsParaTextarea });
    }
  }

  onSalvar(): void {
    if (this.veiculoForm.valid) {
      const formValue = this.veiculoForm.value;
      const urlsDoTextarea = formValue.imagemUrl as string;
      const urlsFormatadas = urlsDoTextarea
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0)
        .join(',');

      if (this.isEditMode) {
        const veiculoAtualizado: Veiculo = {
          ...this.data,
          ...formValue,
          imagemUrl: urlsFormatadas
        };
        
        this.veiculoService.updateVeiculo(this.data.id, veiculoAtualizado).subscribe({
          next: () => { this.dialogRef.close(true); },
          error: (err) => console.error('Erro ao atualizar veículo:', err)
        });

      } else {
        const novoVeiculo: Veiculo = {
          ...formValue,
          imagemUrl: urlsFormatadas
        };

        this.veiculoService.createVeiculo(novoVeiculo).subscribe({
          next: () => { this.dialogRef.close(true); },
          error: (err) => console.error('Erro ao criar veículo:', err)
        });
      }
    }
  }

  onCancelar(): void {
    this.dialogRef.close(false); 
  }
}