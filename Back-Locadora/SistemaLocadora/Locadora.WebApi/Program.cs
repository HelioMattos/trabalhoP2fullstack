using Microsoft.EntityFrameworkCore;
using Locadora.Repositorio;
using Locadora.Servico;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
          policy.WithOrigins("http://localhost:4200")
           .AllowAnyHeader()
           .AllowAnyMethod();
      });
});

builder.Services.AddDbContext<LocadoraDbContext>(options =>
    options.UseInMemoryDatabase("LocadoraDB_Temporaria")
);

builder.Services.AddScoped<VeiculoRepositorio>();
builder.Services.AddScoped<VeiculoServico>();
builder.Services.AddScoped<ClienteRepositorio>();
builder.Services.AddScoped<ClienteServico>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();
app.Run();