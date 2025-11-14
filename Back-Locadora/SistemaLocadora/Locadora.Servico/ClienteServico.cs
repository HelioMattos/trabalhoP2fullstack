using Locadora.Dominio;
using Locadora.Repositorio;

namespace Locadora.Servico
{
    public class ClienteServico
    {
        private readonly ClienteRepositorio _repositorio;

        public ClienteServico(ClienteRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        public async Task<Cliente> Adicionar(Cliente cliente)
        {
            return await _repositorio.Adicionar(cliente);
        }

        public async Task<List<Cliente>> ListarTodos()
        {
            return await _repositorio.ListarTodos();
        }

        public async Task<Cliente> BuscarPorId(int id)
        {
            return await _repositorio.BuscarPorId(id);
        }

        public async Task<Cliente> Atualizar(Cliente cliente)
        {
            return await _repositorio.Atualizar(cliente);
        }

        public async Task Deletar(int id)
        {
            await _repositorio.Deletar(id);
        }
    }
}