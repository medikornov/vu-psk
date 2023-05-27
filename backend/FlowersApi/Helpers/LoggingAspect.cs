using FlowersApi.Services.ItemService;
using PostSharp.Aspects;
using PostSharp.Serialization;
using System.Diagnostics;

namespace FlowersApi.Helpers
{
    [PSerializable]
    public class LoggingAspect : OnMethodBoundaryAspect
    {
        public override void OnEntry(MethodExecutionArgs args)
        {
            var methodName = args.Method.Name;
            var className = args.Method.DeclaringType?.Name;
            var arguments = args.Arguments;

            var message = $"Method {methodName} from class {className} was called with arguments: {string.Join(", ", arguments)}";

            Debug.WriteLine(message);
        }
    }
}
