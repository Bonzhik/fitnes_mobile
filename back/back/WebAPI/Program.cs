using Business.Services.Implementations;
using Business.Services.Interfaces;
using Common.Services;
using DAL.Context;
using DAL.Helpers;
using DAL.Repositories.Implementations;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options
        .UseLazyLoadingProxies()
        .UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddSingleton<IJwtService, JwtService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserCategoryRepository, UserCategoryRepository>();  
builder.Services.AddScoped<IDaysRepository, DaysRepository>();  
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();  
builder.Services.AddScoped<IPlannerRepository, PlannerRepository>();  
builder.Services.AddScoped<IProductRepository, ProductRepository>();  
builder.Services.AddScoped<IProfileCommentRepository, ProfileCommentRepository>();  
builder.Services.AddScoped<ITrainingCategoryRepository, TrainingCategoryRepository>();  
builder.Services.AddScoped<ITrainingCommentRepositry, TrainingCommentRepository>();  
builder.Services.AddScoped<ITrainingRepository, TrainingRepository>();  
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITrainingService, TrainingService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IExerciseService, ExerciseService>();
builder.Services.AddScoped<IProfileCommentService, ProfileCommentService>();
builder.Services.AddScoped<IPlannerService, PlannerService>();
builder.Services.AddScoped<IAuthService,  AuthService>();
builder.Services.AddScoped<IDayService, DayService>();
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
        };
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;

    var db = serviceProvider.GetRequiredService<ApplicationDbContext>();

    DBSeed.Seed(db);
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();