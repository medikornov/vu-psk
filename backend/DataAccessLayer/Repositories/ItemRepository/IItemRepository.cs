using DataAccessLayer.Entities;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryBase;

namespace DataAccessLayer.Repositories.ItemRepository
{
    public interface IItemRepository : IRepositoryBase<Item>
    {
        Task<IEnumerable<Item>> GetAllAsync(PaginationFilter filter);
    }
}
