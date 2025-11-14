
using Locadora.Dominio;
using Locadora.Repositorio;

namespace Locadora.Servico
{
    public class VeiculoServico
    {
        private readonly VeiculoRepositorio _repositorio;

        public VeiculoServico(VeiculoRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        public async Task<Veiculo> Adicionar(Veiculo veiculo)
        {
            veiculo.Status = "Disponível";

            return await _repositorio.Adicionar(veiculo);
        }

        public async Task<List<Veiculo>> ListarTodos()
        {
            return await _repositorio.ListarTodos();
        }

        public async Task<Veiculo> BuscarPorId(int id)
        {
            return await _repositorio.BuscarPorId(id);
        }

        public async Task<Veiculo> Atualizar(Veiculo veiculo)
        {
            return await _repositorio.Atualizar(veiculo);
        }

        public async Task Deletar(int id)
        {
            await _repositorio.Deletar(id);
        }
    }
}
