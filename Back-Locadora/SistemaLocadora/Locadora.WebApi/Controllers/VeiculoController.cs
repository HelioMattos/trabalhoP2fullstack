using Microsoft.AspNetCore.Mvc;
using Locadora.Dominio;
using Locadora.Servico;

namespace Locadora.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VeiculosController : ControllerBase
    {
        private readonly VeiculoServico _servico;

        public VeiculosController(VeiculoServico servico)
        {
            _servico = servico;
        }

        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            var veiculos = await _servico.ListarTodos();
            return Ok(veiculos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarPorId(int id)
        {
            var veiculo = await _servico.BuscarPorId(id);
            if (veiculo == null)
            {
                return NotFound();
            }
            return Ok(veiculo);
        }

        [HttpPost]
        public async Task<IActionResult> Adicionar([FromBody] Veiculo veiculo)
        {
            var novoVeiculo = await _servico.Adicionar(veiculo);

            return CreatedAtAction(nameof(BuscarPorId), new { id = novoVeiculo.Id }, novoVeiculo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] Veiculo veiculo)
        {
            if (id != veiculo.Id)
            {
                return BadRequest("O Id da rota não corresponde ao Id do veículo.");
            }

            var veiculoAtualizado = await _servico.Atualizar(veiculo);
            return Ok(veiculoAtualizado);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            var veiculo = await _servico.BuscarPorId(id);
            if (veiculo == null)
            {
                return NotFound();
            }

            await _servico.Deletar(id);
            return NoContent();
        }
    }
}