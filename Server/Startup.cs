using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DFB.Web.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            HostingEnv = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment HostingEnv { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler("/Error");

            app.Use(MapClientRoutesToHtmlFilesHandler);

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }

        private async Task MapClientRoutesToHtmlFilesHandler(HttpContext context, Func<Task> next)
        {
            string requestPath = context.Request.Path.HasValue ? context.Request.Path.Value : null;
            if (!string.IsNullOrWhiteSpace(requestPath))
            {
                var fileExt = Path.GetExtension(requestPath);
                if (fileExt == string.Empty)
                {
                    var pathSegments = context.Request.Path.Value
                        .Split("/")
                        .Where(segment => segment != "." && segment != ".." && !string.IsNullOrWhiteSpace(segment))
                        .ToList();
                    var relativePath = string.Join("/", pathSegments) + ".html";
                    var filePath = Path.Join(HostingEnv.ContentRootPath, "wwwroot", relativePath);
                    if (File.Exists(filePath))
                    {
                        context.Request.Path = $"/{relativePath}";
                    }
                }
            }

            await next();
        }
    }
}
