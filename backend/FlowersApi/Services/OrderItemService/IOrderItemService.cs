using FlowersApi.Models.OrderItemDtos;

namespace FlowersApi.Services.OrderItemService
{
    public interface IOrderItemService
    {
        Task<IEnumerable<OrderItemResponseDto>> GetAllByOrderIdAsync(Guid orderId);
        Task<OrderItemResponseDto> GetByIdAsync(Guid orderItemId);
        Task<OrderItemResponseDto> CreateAsync(CreateOrderItemDto dto);
        Task<OrderItemResponseDto> UpdateAsync(Guid orderItemId, UpdateOrderItemDto dto);
        Task DeleteAsync(Guid orderItemId);
    }
}
