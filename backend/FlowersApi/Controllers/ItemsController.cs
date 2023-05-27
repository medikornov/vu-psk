using DataAccessLayer.Helpers;
using FlowersApi.Models.ItemDtos;
using FlowersApi.Services.ItemService;
using FlowersApi.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace FlowersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(IItemService itemService, ILogger<ItemsController> logger)
        {
            _itemService = itemService;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedResponse<IEnumerable<ItemResponseDto>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllAsync([FromQuery] PaginationFilter filter)
        {
            try
            {
                var pagedItems = await _itemService.GetAllAsync(filter);
                return Ok(pagedItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(41001, ex, "ItemsController GetAllAsync caused an exception");
                throw;
            }
        }

        [HttpGet("{itemId}")]
        [ProducesResponseType(typeof(Response<ItemResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid itemId)
        {
            try
            {
                var item = await _itemService.GetByIdAsync(itemId);
                return Ok(new Response<ItemResponseDto>(item));
            }
            catch (Exception ex)
            {
                _logger.LogError(41002, ex, "ItemsController GetByIdAsync caused an exception");
                throw;
            }
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [ProducesResponseType(typeof(Response<ItemResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateAsync([FromForm] CreateItemDto dto)
        {
            try
            {
                var item = await _itemService.CreateAsync(dto);
                return Ok(new Response<ItemResponseDto>(item));
            }
            catch (Exception ex)
            {
                _logger.LogError(41003, ex, "ItemsController CreateAsync caused an exception");
                throw;
            }
        }

        [HttpPut("{itemId}")]
        [Consumes("multipart/form-data")]
        [ProducesResponseType(typeof(Response<ItemResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateAsync([FromRoute]Guid itemId, [FromForm]UpdateItemDto dto)
        {
            try
            {
                var item = await _itemService.UpdateAsync(itemId, dto);
                return Ok(new Response<ItemResponseDto>(item));
            }
            catch (Exception ex)
            {
                _logger.LogError(41004, ex, "ItemsController UpdateAsync caused an exception");
                throw;
            }
        }

        [HttpDelete("{itemId}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid itemId)
        {
            try
            {
                await _itemService.DeleteAsync(itemId);
                return Ok(new BaseResponse() { Succeeded = true, Message = "Item deleted successfully."});
            }
            catch (Exception ex)
            {
                _logger.LogError(41005, ex, "ItemsController DeleteAsync caused an exception");
                throw;
            }
        }
    }
}
