using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.EnvironmentVariables;

namespace MyWebApi
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly Uri _connectionUri;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
            string connectionString = _configuration["MONGO_CONNECT"];
            _connectionUri = new Uri(connectionString);
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IMongoDatabase>(provider =>
        {
            var settings = MongoClientSettings.FromConnectionString(_connectionUri.ToString());
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            try
            {
                var result = client.GetDatabase("umacc");
                Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error connecting to MongoDB: " + ex.Message);
                throw;
            }

        });
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();
            app.UseStaticFiles(
                new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(
                        Path.Combine(env.ContentRootPath, "..", "dist")
                    ),
                    ServeUnknownFileTypes = true
                }
            );

            app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 404 && !context.Request.Path.Value.StartsWith("/api"))
    {
        var filePath = Path.Combine(env.ContentRootPath, "..", "dist", "index.html");
        await context.Response.SendFileAsync(filePath);
    }
});

            app.UseWhen(context => !context.Request.Path.Value.StartsWith("/api"),
          builder =>
          {

              app.UseEndpoints(endpoints =>
              {
                  endpoints.MapGet("/", async context =>
                     {
                         var filePath = Path.Combine(env.ContentRootPath, "..", "dist", "index.html");
                         await context.Response.SendFileAsync(filePath);
                     });

                  endpoints.MapDefaultControllerRoute();
                  endpoints.MapControllers();
              });
          });
        }
    }
}