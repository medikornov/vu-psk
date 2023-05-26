using DataAccessLayer.Repositories.CustomerRepository;
using DataAccessLayer.Repositories.ItemRepository;
using DataAccessLayer.Repositories.OrderItemRepository;
using DataAccessLayer.Repositories.OrderRepository;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccessLayer.Repositories.RepositoryWrapper
{
    public interface IRepositoryWrapper
    {
        IItemRepository Items { get; }
        ICustomerRepository Customers { get; }
        IOrderRepository Orders { get; }
        IOrderItemRepository OrderItems { get; }
        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}
