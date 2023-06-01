using DataAccessLayer.Helpers;
using FlowersApi.Models.OrderDtos;
using FlowersApi.Models.OrderItemDtos;
using FlowersApi.Services.OrderItemService;
using FlowersApi.Services.OrderService;
using FlowersApi.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlowersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IOrderItemService _orderItemService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(
            IOrderService orderService,
            IOrderItemService orderItemService,
            ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _orderItemService = orderItemService;
            _logger = logger;
        }

        [Authorize(Policy = "ReadOrders")]
        [HttpGet]
        [ProducesResponseType(typeof(PagedResponse<IEnumerable<OrderResponseDto>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllAsync([FromQuery] PaginationFilter filter)
        {
            try
            {
                var orders = await _orderService.GetAllAsync(filter);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(44500, ex, "OrdersController GetAllAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpGet("{orderId}/orderItems")]
        [ProducesResponseType(typeof(Response<IEnumerable<OrderItemResponseDto>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrderItemsByOrderIdAsync([FromRoute] Guid orderId)
        {
            try
            {
                var orderItems = await _orderItemService.GetAllByOrderIdAsync(orderId);
                return Ok(new Response<IEnumerable<OrderItemResponseDto>>(orderItems));
            }
            catch (Exception ex)
            {
                _logger.LogError(44501, ex, "OrdersController GetAllOrderItemsByOrderIdAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpGet("{orderId}")]
        [ProducesResponseType(typeof(Response<OrderResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid orderId)
        {
            try
            {
                var order = await _orderService.GetByIdAsync(orderId);
                return Ok(new Response<OrderResponseDto>(order));
            }
            catch (Exception ex)
            {
                _logger.LogError(44503, ex, "OrdersController GetByIdAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(Response<OrderResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateAsync([FromBody] CreateOrderDto dto)
        {
            try
            {
                var order = await _orderService.CreateAsync(dto);
                return Ok(new Response<OrderResponseDto>(order));
            }
            catch (Exception ex)
            {
                _logger.LogError(44504, ex, "OrdersController CreateAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpPut("{orderId}")]
        [ProducesResponseType(typeof(Response<OrderResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateAsync([FromRoute] Guid orderId, [FromBody] UpdateOrderDto dto)
        {
            try
            {
                var order = await _orderService.UpdateAsync(orderId, dto);
                return Ok(new Response<OrderResponseDto>(order));
            }
            catch (Exception ex)
            {
                _logger.LogError(44505, ex, "OrdersController UpdateAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpDelete("{orderId}")]
        [ProducesResponseType(typeof(BaseResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid orderId)
        {
            try
            {
                await _orderService.DeleteAsync(orderId);
                return Ok(new BaseResponse() { Succeeded = true, Message = "Order deleted successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(44506, ex, "OrdersController DeleteAsync caused an exception");
                throw;
            }
        }
    }
}
