using FlowersApi.Wrappers;
using System.Net;
using System.Text.Json;

namespace FlowersApi.Helpers
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlerMiddleware> _logger;

        public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error) 
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch(error)
                {
                    case AppException:
                        // Custom application error
                        _logger.LogError(4001, error, "Application got a bad request exception.");
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        break;
                    case KeyNotFoundException:
                        // Not found error
                        _logger.LogError(4002, error, "Application got a key not found exception.");
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    default:
                        // Unhandled error
                        _logger.LogError(4003, error, "Application got an unexpected exception.");
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var result = JsonSerializer.Serialize(
                    new BaseResponse()
                    {
                        Succeeded = false,
                        Message = error.Message
                    });

                await response.WriteAsync(result);
            }
        }
    }
}
