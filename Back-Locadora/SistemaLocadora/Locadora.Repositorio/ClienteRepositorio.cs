using Locadora.Dominio;
using Microsoft.EntityFrameworkCore;

namespace Locadora.Repositorio
{
    public class ClienteRepositorio
    {
        private readonly LocadoraDbContext _context;

        public ClienteRepositorio(LocadoraDbContext context)
        {
            _context = context;
        }

        public async Task<Cliente> Adicionar(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task<List<Cliente>> ListarTodos()
        {
            return await _context.Clientes.ToListAsync();
        }

        public async Task<Cliente> BuscarPorId(int id)
        {
            return await _context.Clientes.FindAsync(id);
        }

        public async Task<Cliente> Atualizar(Cliente cliente)
        {
            _context.Entry(cliente).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return cliente;
        }

        public async Task Deletar(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();
            }
        }
    }
}