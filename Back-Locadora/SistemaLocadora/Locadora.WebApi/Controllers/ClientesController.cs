using Locadora.Dominio;
using Locadora.Servico;
using Microsoft.AspNetCore.Mvc;

namespace Locadora.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly ClienteServico _servico;

        public ClientesController(ClienteServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            var clientes = await _servico.ListarTodos();
            return Ok(clientes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarPorId(int id)
        {
            var cliente = await _servico.BuscarPorId(id);
            if (cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] Cliente cliente)
        {
            var novoCliente = await _servico.Adicionar(cliente);

            return CreatedAtAction(nameof(BuscarPorId), new { id = novoCliente.Id }, novoCliente);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] Cliente cliente)
        {
            if (id != cliente.Id)
            {
                return BadRequest("O Id da rota não corresponde ao Id do cliente.");
            }

            var clienteAtualizado = await _servico.Atualizar(cliente);
            return Ok(clienteAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var cliente = await _servico.BuscarPorId(id);
            if (cliente == null)
            {
                return NotFound();
            }

            await _servico.Deletar(id);
            return NoContent();
        }
    }
}