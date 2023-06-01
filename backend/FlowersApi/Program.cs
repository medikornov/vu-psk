using DataAccessLayer.Context;
using DataAccessLayer.Repositories.RepositoryWrapper;
using FlowersApi.Helpers;
using FlowersApi.Services.CustomerService;
using FlowersApi.Services.ItemService;
using FlowersApi.Services.OrderItemService;
using FlowersApi.Services.OrderService;
using FlowersApi.Services.OrderTotalStrategy;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

{
    var services = builder.Services;
    var env = builder.Environment;

    services.AddDbContext<DataContext>();
    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    services.AddEndpointsApiExplorer();
    services.AddApplicationInsightsTelemetry();

    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new() { Title = "Flowers Api", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
                Array.Empty<string>()
            }
        });
    });

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
            options.Audience = builder.Configuration["Auth0:Audience"];
        });

    services.AddAuthorization(options =>
    {
        options.AddPolicy("CreateItem", policy => policy.RequireClaim("permissions", "create:item"));
        options.AddPolicy("UpdateItem", policy => policy.RequireClaim("permissions", "update:item"));
        options.AddPolicy("DeleteItem", policy => policy.RequireClaim("permissions", "delete:item"));
        options.AddPolicy("ReadOrders", policy => policy.RequireClaim("permissions", "read:orders"));
    });

    // configure DI for application services
    services.AddScoped<IItemService, ItemService>();
    services.AddScoped<ICustomerService, CustomerService>();
    services.AddScoped<IOrderService, OrderService>();
    services.AddScoped<IOrderItemService, OrderItemService>();
    services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();

    // Strategy pattern
    if (Convert.ToBoolean(builder.Configuration["EnableTaxStrategy"]))
    {
        services.AddScoped<ITaxStrategy, CountryTaxStrategy>();
    }
    else
    {
        services.AddScoped<ITaxStrategy, NoTaxStrategy>();
    }

    // Decorate order service with stopwatch logging
    if (Convert.ToBoolean(builder.Configuration["EnableStopwatchLogging"]))
    {
        services.Decorate<IOrderService, OrderServiceLoggingDecorator>();
    }
}

var app = builder.Build();

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dataContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
{
    // generated swagger json and swagger ui middleware
    app.UseSwagger();
    app.UseSwaggerUI(x => x.SwaggerEndpoint("/swagger/v1/swagger.json", ".NET Sign-up and Verification API"));

    // global cors policy
    app.UseCors(x => x
        .SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();
}

app.Run();
