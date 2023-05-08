namespace FlowersApi.Wrappers
{
    public class BaseResponse
    {
        public bool Succeeded { get; set; }
        public string[]? Errors { get; set; }
        public string Message { get; set; } = null!;
    }
}
