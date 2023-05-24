using DataAccessLayer.Context;
using DataAccessLayer.Repositories.CustomerRepository;
using DataAccessLayer.Repositories.ItemRepository;
using DataAccessLayer.Repositories.OrderItemRepository;
using DataAccessLayer.Repositories.OrderRepository;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccessLayer.Repositories.RepositoryWrapper
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly DataContext _context;
        private IItemRepository? _item;
        private ICustomerRepository? _customer;
        private IOrderRepository? _order;
        private IOrderItemRepository? _orderItem;

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

        public IOrderRepository Orders
        {
            get
            {
                if (_order == null)
                {
                    _order = new OrderRepository.OrderRepository(_context);
                }

                return _order;
            }
        }

        public IOrderItemRepository OrderItems
        {
            get
            {
                if (_orderItem == null)
                {
                    _orderItem = new OrderItemRepository.OrderItemRepository(_context);
                }

                return _orderItem;
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
