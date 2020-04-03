using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace OfficeMap
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            
            //ДОСТУП К БД
            // var builder = new ConfigurationBuilder();
            // // установка пути к текущему каталогу
            // builder.SetBasePath(Directory.GetCurrentDirectory());
            // // получаем конфигурацию из файла appsettings.json
            // builder.AddJsonFile("appsettings.json");
            // // создаем конфигурацию
            // var config = builder.Build();
            // // получаем строку подключения
            // var connectionString = config.GetConnectionString("ConnectionToHeroku");
            //
            // var optionsBuilder = new DbContextOptionsBuilder<OfficeMapDbContext>();
            // var options = optionsBuilder.UseLazyLoadingProxies().UseNpgsql(connectionString).Options;
            //
            // using (var dbContext = new OfficeMapDbContext(options))
            // {
            //     var employees = dbContext.Employees.ToList();
            //     foreach (var employee in employees)
            //         Console.WriteLine($"{employee.FirstName} {employee.LastName} - {employee.Position.Name} - {employee.Desk?.FloorNumber}");
            // }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}