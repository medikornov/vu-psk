using DataAccessLayer.Helpers;
using FlowersApi.Models.Item;
using FlowersApi.Wrappers;

namespace FlowersApi.Services.ItemService
{
    public interface IItemService
    {
        Task<PagedResponse<IEnumerable<ItemResponseDto>>> GetAllAsync(PaginationFilter filter);
        Task<ItemResponseDto> GetByIdAsync(Guid itemId);
        Task<ItemResponseDto> CreateAsync(CreateItemDto dto);
        Task<ItemResponseDto> UpdateAsync(Guid itemId, UpdateItemDto dto);
        Task DeleteAsync(Guid itemId);
    }
}
