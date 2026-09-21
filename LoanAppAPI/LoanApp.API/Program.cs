using Scalar.AspNetCore;
using Microsoft.EntityFrameworkCore;
using LoanApp.API.ExceptionHandler;
using LoanApp.Infrastructure;
using LoanApp.Infrastructure.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:54190")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// https://milanjovanovic.tech/blog/global-error-handling-in-aspnetcore-from-middleware-to-modern-handlers
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.Configure<RouteOptions>(options => { options.LowercaseUrls = true; });
builder.Services.AddDbContext<LoanApplicationDBContext>(options => options.UseInMemoryDatabase("LoanApplicationDB"));
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

builder.Services.RegisterRepositories();
builder.Services.RegisterServices();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowLocalhost");

// Configure the HTTP request pipeline for Development.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseAuthorization();

app.MapControllers();
app.UseExceptionHandler();

app.Run();
