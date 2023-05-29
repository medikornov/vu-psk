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
                builder.AddApplicationInsights();
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
            configurationBuilder.AddJsonFile("appsettings.json");

            var configuration = configurationBuilder.Build();

            LoggingAspectEnabled = configuration.GetValue<bool>("LoggingAspectEnabled");
        }
    }
}
