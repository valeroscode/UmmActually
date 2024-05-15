// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Configuration.Json;
// using System.IO;

// public class DotEnvConfigurationProvider : ConfigurationProvider
// {
//     private readonly string _path;
//     public DotEnvConfigurationProvider(string path)
//     {
//         _path = path;
//     }

//     public override void Load()
//     {
//         var builder = new ConfigurationBuilder()
//             .SetBasePath(Directory.GetCurrentDirectory())
//             .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
//             .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true)
//             .AddEnvironmentVariables();

//         var envFile = Path.Combine(Directory.GetCurrentDirectory(), _path);
//         if (File.Exists(envFile))
//         {
//             builder.AddJsonFile(envFile, optional: true, reloadOnChange: true);
//         }

//         // Read the contents of the .env file
//         string[] lines = File.ReadAllLines(_path);

//         // Create a dictionary to hold configuration data
//         IDictionary<string, string?> data = new Dictionary<string, string?>();

//         // Parse each line and add key-value pairs to the configuration data
//         foreach (string line in lines)
//         {
//             string[] parts = line.Split('=');
//             if (parts.Length == 2)
//             {
//                 data[parts[0]] = parts[1];
//             }

//             if (parts[0] == "MONGO_CONNECT")
//             {
//                 data[parts[0]] = parts[1] + parts[2] + parts[3];
//             }


//         }

//         // Convert the dictionary to IDictionary<string, string?> and assign it to Data
//         Data = data.ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
//     }
// }

// public class DotEnvConfigurationSource : FileConfigurationSource
// {
//     public DotEnvConfigurationSource(string path)
//     {
//         Path = path;
//     }

//     public override IConfigurationProvider Build(IConfigurationBuilder builder)
//     {
//         return new DotEnvConfigurationProvider(Path);
//     }
// }