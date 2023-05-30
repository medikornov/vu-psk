using PostSharp.Aspects;
using PostSharp.Serialization;

namespace FlowersApi.Helpers
{
    [PSerializable]
    public class LoggingAspect : OnMethodBoundaryAspect
    {
        private static bool LoggingAspectEnabled { get; set; }

        private static readonly ILogger _logger = 
            LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
                builder.AddApplicationInsights("4bbab67d-b131-4913-a6a1-912357f1de82");
            }).CreateLogger<LoggingAspect>();

        public override void OnEntry(MethodExecutionArgs args)
        {
            LoadConfiguration();

            if (!LoggingAspectEnabled)
            {
                return;
            }

            var methodName = args.Method.Name;
            var className = args.Method.DeclaringType?.Name;
            var arguments = args.Arguments;
            var dateTime = DateTime.UtcNow;

            var message = $"Method {methodName} from class {className} was called with arguments: {string.Join(", ", arguments)}. DateTime: {dateTime}";

            _logger.LogInformation(message);
        }

        private void LoadConfiguration()
        {
            var configurationBuilder = new ConfigurationBuilder();
            configurationBuilder
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            var configuration = configurationBuilder.Build();

            LoggingAspectEnabled = bool.Parse(configuration.GetValue<string>("LoggingAspectEnabled")!);
        }
    }
}
