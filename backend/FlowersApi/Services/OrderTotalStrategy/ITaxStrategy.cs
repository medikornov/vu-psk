namespace FlowersApi.Services.OrderTotalStrategy
{
    public interface ITaxStrategy
    {
        decimal CalculateFinalTotal(decimal orderTotal);
    }
}
