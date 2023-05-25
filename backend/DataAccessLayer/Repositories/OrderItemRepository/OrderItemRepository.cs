using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.RepositoryBase;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.OrderItemRepository
{
    public class OrderItemRepository : RepositoryBase<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(DataContext dataContext) : base(dataContext) { }

        public async Task<IEnumerable<OrderItem>> GetAllByOrderIdAsync(Guid orderId)
        {
            return await GetAllByCondition(orderItem => orderItem.OrderId == orderId)
                .ToListAsync();
        }
    }
}
