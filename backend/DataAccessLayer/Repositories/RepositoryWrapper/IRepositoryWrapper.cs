using DataAccessLayer.Repositories.ItemRepository;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccessLayer.Repositories.RepositoryWrapper
{
    public interface IRepositoryWrapper
    {
        IItemRepository Items { get; }
        Task SaveAsync();
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}
