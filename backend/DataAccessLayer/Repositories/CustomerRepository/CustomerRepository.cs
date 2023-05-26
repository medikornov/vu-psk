using DataAccessLayer.Context;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.RepositoryBase;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.CustomerRepository
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(DataContext dataContext) : base(dataContext) { }

        public async Task<Customer?> GetByAuthZeroUserIdAsync(string authZeroUserId)
        {
            return await GetAllByCondition(customer => customer.AuthZeroUserId == authZeroUserId)
                .FirstOrDefaultAsync();
        }
    }
}
