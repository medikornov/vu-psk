using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.RepositoryBase;

namespace DataAccessLayer.Repositories.OrderItemRepository
{
    public interface IOrderItemRepository : IRepositoryBase<OrderItem>
    {
        Task<IEnumerable<OrderItem>> GetAllByOrderIdAsync(Guid orderId);
    }
}
