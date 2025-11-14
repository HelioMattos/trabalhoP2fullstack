using Locadora.Dominio;
using Microsoft.EntityFrameworkCore;

namespace Locadora.Repositorio
{
    public class LocadoraDbContext : DbContext
    {
        public LocadoraDbContext(DbContextOptions<LocadoraDbContext> options) : base(options)
        {
        }
        public DbSet<Veiculo> Veiculos { get; set; }

        public DbSet<Cliente> Clientes { get; set; }
    }
}