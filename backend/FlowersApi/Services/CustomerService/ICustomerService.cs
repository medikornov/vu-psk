using FlowersApi.Models.Customer;

namespace FlowersApi.Services.CustomerService
{
    public interface ICustomerService
    {
        Task<CustomerResponseDto> GetByIdAsync(Guid customerId);
        Task<CustomerResponseDto> GetByAuthZeroUserIdAsync(string authZeroUserId);
        Task<CustomerResponseDto> CreateAsync(CreateCustomerDto dto);
        Task<CustomerResponseDto> UpdateAsync(Guid customerId, UpdateCustomerDto dto);
        Task DeleteAsync(Guid customerId);
    }
}
