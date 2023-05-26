using DataAccessLayer.Helpers;
using FlowersApi.Models.OrderDtos;
using FlowersApi.Wrappers;

namespace FlowersApi.Services.OrderService
{
    public interface IOrderService
    {
        Task<PagedResponse<IEnumerable<OrderResponseDto>>> GetAllByCustomerIdAsync(Guid customerId, PaginationFilter filter);
        Task<OrderResponseDto> GetByIdAsync(Guid orderId);
        Task<OrderResponseDto> CreateAsync(CreateOrderDto dto);
        Task<OrderResponseDto> UpdateAsync(Guid orderId, UpdateOrderDto dto);
        Task DeleteAsync(Guid orderId);
    }
}
