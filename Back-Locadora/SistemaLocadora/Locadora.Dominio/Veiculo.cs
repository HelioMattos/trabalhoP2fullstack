using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Locadora.Dominio
{
    public class Veiculo
    {
        public int Id { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public int Ano { get; set; }
        public string Placa { get; set; }
        public decimal ValorDiaria { get; set; }
        public string ImagemUrl { get; set; }
        public string? Status { get; set; }
    }
}