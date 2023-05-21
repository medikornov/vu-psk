using DataAccessLayer.Context;
using DataAccessLayer.Repositories.CustomerRepository;
using DataAccessLayer.Repositories.ItemRepository;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccessLayer.Repositories.RepositoryWrapper
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly DataContext _context;
        private IItemRepository? _item;
        private ICustomerRepository? _customer;

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

        public ICustomerRepository Customers
        {
            get
            {
                  if (_customer == null)
                {
                    _customer = new CustomerRepository.CustomerRepository(_context);
                }

                return _customer;
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
