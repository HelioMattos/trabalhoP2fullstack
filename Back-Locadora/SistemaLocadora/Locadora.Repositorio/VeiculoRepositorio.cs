using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Locadora.Dominio;
using Microsoft.EntityFrameworkCore;

namespace Locadora.Repositorio
{
    public class VeiculoRepositorio
    {
        private readonly LocadoraDbContext _context;

        public VeiculoRepositorio(LocadoraDbContext context)
        {
            _context = context;
        }

        public async Task<Veiculo> Adicionar(Veiculo veiculo)
        {
            _context.Veiculos.Add(veiculo);
            await _context.SaveChangesAsync();
            return veiculo;
        }

        public async Task<List<Veiculo>> ListarTodos()
        {
            return await _context.Veiculos.ToListAsync();
        }

        public async Task<Veiculo> BuscarPorId(int id)
        {
            return await _context.Veiculos.FindAsync(id);
        }

        public async Task<Veiculo> Atualizar(Veiculo veiculo)
        {
            _context.Entry(veiculo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return veiculo;
        }

        public async Task Deletar(int id)
        {
            var veiculo = await _context.Veiculos.FindAsync(id);
            if (veiculo != null)
            {
                _context.Veiculos.Remove(veiculo);
                await _context.SaveChangesAsync();
            }
        }
    }
}