using FlowersApi.Models.OrderItemDtos;
using FlowersApi.Services.OrderItemService;
using FlowersApi.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlowersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemService _orderItemService;
        private readonly ILogger<OrderItemsController> _logger;

        public OrderItemsController(IOrderItemService orderItemService, ILogger<OrderItemsController> logger)
        {
            _orderItemService = orderItemService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet("{orderItemId}")]
        [ProducesResponseType(typeof(Response<OrderItemResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid orderItemId)
        {
            try
            {
                var orderItem = await _orderItemService.GetByIdAsync(orderItemId);
                return Ok(new Response<OrderItemResponseDto>(orderItem));
            }
            catch (Exception ex)
            {
                _logger.LogError(44603, ex, "OrderItemsController GetByIdAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(Response<OrderItemResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateAsync([FromBody] CreateOrderItemDto dto)
        {
            try
            {
                var orderItem = await _orderItemService.CreateAsync(dto);
                return Ok(new Response<OrderItemResponseDto>(orderItem));
            }
            catch (Exception ex)
            {
                _logger.LogError(44604, ex, "OrderItemsController CreateAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpPut("{orderItemId}")]
        [ProducesResponseType(typeof(Response<OrderItemResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateAsync([FromRoute] Guid orderItemId, [FromBody] UpdateOrderItemDto dto)
        {
            try
            {
                var orderItem = await _orderItemService.UpdateAsync(orderItemId, dto);
                return Ok(new Response<OrderItemResponseDto>(orderItem));
            }
            catch (Exception ex)
            {
                _logger.LogError(44605, ex, "OrderItemsController UpdateAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpDelete("{orderItemId}")]
        [ProducesResponseType(typeof(BaseResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid orderItemId)
        {
            try
            {
                await _orderItemService.DeleteAsync(orderItemId);
                return Ok(new BaseResponse() { Succeeded = true, Message = "Order deleted successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(44606, ex, "OrderItemsController DeleteAsync caused an exception");
                throw;
            }
        }
    }
}
