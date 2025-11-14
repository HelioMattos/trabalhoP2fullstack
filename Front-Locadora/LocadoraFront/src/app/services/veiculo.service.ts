import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
 
  private readonly apiUrl = 'https://localhost:7046/api/veiculos';

  constructor(private http: HttpClient) { }

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }

  createVeiculo(veiculo: Veiculo): Observable<Veiculo> {
     const novoVeiculo = {
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      ano: veiculo.ano,
      placa: veiculo.placa,
      valorDiaria: veiculo.valorDiaria,
      imagemUrl: veiculo.imagemUrl
    };
    return this.http.post<Veiculo>(this.apiUrl, novoVeiculo);
  }

  updateVeiculo(id: number, veiculo: Veiculo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, veiculo);
  }

  deleteVeiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}