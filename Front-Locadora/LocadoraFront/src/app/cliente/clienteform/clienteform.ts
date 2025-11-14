import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clienteform',
  standalone: true,
  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './clienteform.html',
  styleUrls: ['./clienteform.css']
})
export class Clienteform implements OnInit {

  clienteForm!: FormGroup;
  isEditMode = false;
  tituloFormulario = 'Cadastrar Novo Cliente';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<Clienteform>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) { }

  ngOnInit(): void {
     this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required]
    });

      if (this.data) {
      this.isEditMode = true;
      this.tituloFormulario = 'Editar Cliente';
      this.clienteForm.patchValue(this.data);
    }
  }

  onSalvar(): void {
    if (this.clienteForm.valid) {
      
      if (this.isEditMode) {
        const clienteAtualizado: Cliente = {
          ...this.data,
          ...this.clienteForm.value
        };
        
        this.clienteService.updateCliente(this.data.id, clienteAtualizado).subscribe({
          next: () => { this.dialogRef.close(true); },
          error: (err) => console.error('Erro ao atualizar cliente:', err)
        });

      } else {
        const novoCliente: Cliente = this.clienteForm.value;
        
        this.clienteService.createCliente(novoCliente).subscribe({
          next: () => { this.dialogRef.close(true); },
          error: (err) => console.error('Erro ao criar cliente:', err)
        });
      }
    }
  }

  onCancelar(): void {
    this.dialogRef.close(false);
  }
}