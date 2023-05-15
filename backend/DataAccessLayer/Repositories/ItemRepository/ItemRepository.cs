using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryBase;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.ItemRepository
{
    public class ItemRepository : RepositoryBase<Item>, IItemRepository
    {
        public ItemRepository(DataContext dataContext) : base(dataContext) { }
           
        public async Task<IEnumerable<Item>> GetAllAsync(PaginationFilter filter)
        {
            return await GetAll()
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
        }
    }
}
