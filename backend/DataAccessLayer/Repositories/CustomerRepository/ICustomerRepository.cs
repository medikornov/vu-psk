using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.RepositoryBase;

namespace DataAccessLayer.Repositories.CustomerRepository
{
    public interface ICustomerRepository : IRepositoryBase<Customer>
    {
        Task<Customer?> GetByAuthZeroUserIdAsync(string authZeroUserId);
    }
}
