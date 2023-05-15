namespace FlowersApi.Wrappers
{
    public class Response<T> : BaseResponse
    {
        public T Data { get; set; }

        public Response(T data)
        {
            Succeeded = true;
            Message = string.Empty;
            Errors = Array.Empty<string>();
            Data = data;
        }
    }
}
