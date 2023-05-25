using DataAccessLayer.Helpers;
using FlowersApi.Models.CustomerDtos;
using FlowersApi.Models.OrderDtos;
using FlowersApi.Services.CustomerService;
using FlowersApi.Services.OrderService;
using FlowersApi.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlowersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IOrderService _orderService;
        private readonly ILogger<CustomersController> _logger;

        public CustomersController(
            ICustomerService customerService,
            IOrderService orderService,
            ILogger<CustomersController> logger)
        {
            _customerService = customerService;
            _orderService = orderService;
            _logger = logger;
        }

        [HttpGet("{customerId}/orders")]
        [ProducesResponseType(typeof(Response<IEnumerable<OrderResponseDto>>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrdersByCustomerIdAsync([FromRoute] Guid customerId, [FromQuery] PaginationFilter filter)
        {
            try
            {
                var orders = await _orderService.GetAllByCustomerIdAsync(customerId, filter);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                _logger.LogError(650004, ex, "CustomersController GetAllOrdersByCustomerIdAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpGet("{customerId}")]
        [ProducesResponseType(typeof(Response<CustomerResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByIdAsync([FromRoute] Guid customerId)
        {
            try
            {
                var customer = await _customerService.GetByIdAsync(customerId);
                return Ok(new Response<CustomerResponseDto>(customer));
            }
            catch (Exception ex)
            {
                _logger.LogError(660001, ex, "CustomersController GetByIdAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpGet("auth0/{authZeroUserId}")]
        [ProducesResponseType(typeof(Response<CustomerResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByAuthZeroUserIdAsync([FromRoute] string authZeroUserId)
        {
            try
            {
                var customer = await _customerService.GetByAuthZeroUserIdAsync(authZeroUserId);
                return Ok(new Response<CustomerResponseDto>(customer));
            }
            catch (Exception ex)
            {
                _logger.LogError(660002, ex, "CustomersController GetByAuthZeroUserIdAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(Response<CustomerResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateAsync([FromBody] CreateCustomerDto dto)
        {
            try
            {
                var customer = await _customerService.CreateAsync(dto);
                return Ok(new Response<CustomerResponseDto>(customer));
            }
            catch (Exception ex)
            {
                _logger.LogError(660003, ex, "CustomersController CreateAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpPut("{customerId}")]
        [ProducesResponseType(typeof(Response<CustomerResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateAsync([FromRoute] Guid customerId, [FromBody] UpdateCustomerDto dto)
        {
            try
            {
                var customer = await _customerService.UpdateAsync(customerId, dto);
                return Ok(new Response<CustomerResponseDto>(customer));
            }
            catch (Exception ex)
            {
                _logger.LogError(660004, ex, "CustomersController UpdateAsync caused an exception");
                throw;
            }
        }

        [Authorize]
        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid customerId)
        {
            try
            {
                await _customerService.DeleteAsync(customerId);
                return Ok(new BaseResponse() { Succeeded = true, Message = "Customer deleted successfully." });
            }
            catch (Exception ex)
            {
                _logger.LogError(660005, ex, "CustomersController DeleteAsync caused an exception");
                throw;
            }
        }
    }
}
