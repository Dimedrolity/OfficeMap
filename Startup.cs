using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OfficeMap.Models;

namespace OfficeMap
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            string con =
                "Host=ec2-54-246-89-234.eu-west-1.compute.amazonaws.com; Database=daskaovpl1pp2q; Username=eyaodbfswdycpk; Password=4167d3c88956cd3e75ace1fa757956478d84d4a7106541716ef7f8faad8d3fbc; sslmode=Require; Trust Server Certificate=true;";

            services.AddDbContext<OfficeMapDbContext>(options => options.UseNpgsql(con));

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
                });
            

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();
            
            app.UseCors(builder => builder.AllowAnyOrigin());
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context => { await context.Response.WriteAsync("Hello World!"); });
                endpoints.MapControllers(); // подключаем маршрутизацию на контроллеры
            });
        }
    }
}