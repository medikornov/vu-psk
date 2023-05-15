using DataAccessLayer.Context;
using DataAccessLayer.Repositories.ItemRepository;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccessLayer.Repositories.RepositoryWrapper
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly DataContext _context;
        private IItemRepository? _item;

        public RepositoryWrapper(DataContext context)
        {
            _context = context;
        }

        public IItemRepository Items
        {
            get
            {
                if (_item == null)
                {
                    _item = new ItemRepository.ItemRepository(_context);
                }

                return _item;
            }
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _context.Database.BeginTransactionAsync();
        }
    }
}
