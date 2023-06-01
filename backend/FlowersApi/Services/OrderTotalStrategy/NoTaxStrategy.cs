namespace FlowersApi.Services.OrderTotalStrategy
{
    public class NoTaxStrategy : ITaxStrategy
    {
        public decimal CalculateFinalTotal(decimal orderTotal)
        {
            return orderTotal;
        }
    }
}
