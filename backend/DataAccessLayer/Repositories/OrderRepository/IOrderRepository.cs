using DataAccessLayer.Entities;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryBase;

namespace DataAccessLayer.Repositories.OrderRepository
{
    public interface IOrderRepository : IRepositoryBase<Order>
    {
        Task<IEnumerable<Order>> GetAllAsync(PaginationFilter filter);
        Task<IEnumerable<Order>> GetAllByCustomerIdAsync(Guid customerId, PaginationFilter filter);
        Task<int> CountByCustomerIdAsync(Guid customerId);
    }
}
