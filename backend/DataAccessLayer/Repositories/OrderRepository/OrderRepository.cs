using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryBase;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.OrderRepository
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(DataContext dataContext) : base(dataContext) { }

        public async Task<IEnumerable<Order>> GetAllByCustomerIdAsync(Guid customerId, PaginationFilter filter)
        {
            return await GetAllByCondition(order => order.CustomerId == customerId)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
        }

        public async Task<int> CountByCustomerIdAsync(Guid customerId)
        {
            return await CountByConditionAsync(order => order.CustomerId == customerId);
        }
    }
}
