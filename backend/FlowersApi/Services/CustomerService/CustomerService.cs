using AutoMapper;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.RepositoryWrapper;
using FlowersApi.Models.Customer;

namespace FlowersApi.Services.CustomerService
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepositoryWrapper _repositoryWrapper;
        private readonly IMapper _mapper;
        private readonly ILogger<CustomerService> _logger;

        public CustomerService(IRepositoryWrapper repositoryWrapper, IMapper mapper, ILogger<CustomerService> logger)
        {
            _repositoryWrapper = repositoryWrapper;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<CustomerResponseDto> GetByIdAsync(Guid customerId)
        {
            try
            {
                var customer = await GetCustomerByIdAsync(customerId);
                return _mapper.Map<CustomerResponseDto>(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError(550002, ex, "CustomerService GetByIdAsync caused an exception");
                throw;
            }
        }

        public async Task<CustomerResponseDto> GetByAuthZeroUserIdAsync(string authZeroUserId)
        {
            try
            {
                var customer = await GetCustomerByAuthZeroUserIdAsync(authZeroUserId);
                return _mapper.Map<CustomerResponseDto>(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError(550003, ex, "CustomerService GetByAuthZeroUserIdAsync caused an exception");
                throw;
            }
        }

        public async Task<CustomerResponseDto> CreateAsync(CreateCustomerDto dto)
        {
            try
            {
                var customer = _mapper.Map<Customer>(dto);

                // Add new guid
                customer.CustomerId = Guid.NewGuid();

                customer.CreationTime = DateTime.UtcNow;

                // Save customer
                _repositoryWrapper.Customers.Add(customer);
                await _repositoryWrapper.SaveAsync();

                return _mapper.Map<CustomerResponseDto>(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError(550004, ex, "CustomerService CreateAsync caused an exception");
                throw;
            }
        }

        public async Task<CustomerResponseDto> UpdateAsync(Guid customerId, UpdateCustomerDto dto)
        {
            try
            {
                var customer = await GetCustomerByIdAsync(customerId);

                // Update customer
                _mapper.Map(dto, customer);

                _repositoryWrapper.Customers.Update(customer);
                await _repositoryWrapper.SaveAsync();

                return _mapper.Map<CustomerResponseDto>(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError(550005, ex, "CustomerService UpdateAsync caused an exception");
                throw;
            }
        }

        public async Task DeleteAsync(Guid customerId)
        {
            try
            {
                var customer = await GetCustomerByIdAsync(customerId);

                // Delete customer
                _repositoryWrapper.Customers.Delete(customer);
                await _repositoryWrapper.SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(550006, ex, "CustomerService DeleteAsync caused an exception");
                throw;
            }
        }

        // Helper method
        private async Task<Customer> GetCustomerByIdAsync(Guid customerId)
        {
            var customer = await _repositoryWrapper.Customers.FindAsync(customerId);

            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with id {customerId} not found");
            }

            return customer;
        }

        private async Task<Customer> GetCustomerByAuthZeroUserIdAsync(string authZeroUserId)
        {
            var customer = await _repositoryWrapper.Customers.GetByAuthZeroUserIdAsync(authZeroUserId);

            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with AuthZeroUserId {authZeroUserId} not found");
            }

            return customer;
        }
    }
}
