namespace FlowersApi.Services.OrderTotalStrategy
{
    public class CountryTaxStrategy : ITaxStrategy
    {
        public decimal CalculateFinalTotal(decimal orderTotal)
        {
            return orderTotal * 1.2m;
        }
    }
}
