using DataAccessLayer.Helpers;
using FlowersApi.Helpers;
using FlowersApi.Models.OrderDtos;
using FlowersApi.Wrappers;
using System.Diagnostics;

namespace FlowersApi.Services.OrderService
{
    public class OrderServiceLoggingDecorator : IOrderService
    {
        private readonly IOrderService _orderService;
        private static readonly ILogger _logger =
            LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
                builder.AddApplicationInsights("4bbab67d-b131-4913-a6a1-912357f1de82");
            }).CreateLogger<OrderServiceLoggingDecorator>();

        public OrderServiceLoggingDecorator(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<PagedResponse<IEnumerable<OrderResponseDto>>> GetAllAsync(PaginationFilter filter)
        {
            _logger.LogInformation("Starting to fetch data");

            var stopwatch = Stopwatch.StartNew();

            var orders = await _orderService.GetAllAsync(filter);
            
            foreach (var order in orders.Data)
            {
                _logger.LogInformation($"Order: {order.OrderId}");
            }

            stopwatch.Stop();

            var elapsedTime = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation($"Finished fetching data in {elapsedTime} ms");

            return orders;
        }

        public async Task<PagedResponse<IEnumerable<OrderResponseDto>>> GetAllByCustomerIdAsync(Guid customerId, PaginationFilter filter)
        {
            _logger.LogInformation("Starting to fetch data");

            var stopwatch = Stopwatch.StartNew();

            var orders = await _orderService.GetAllByCustomerIdAsync(customerId, filter);

            foreach (var order in orders.Data)
            {
                _logger.LogInformation($"Order: {order.OrderId}");
            }

            stopwatch.Stop();

            var elapsedTime = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation($"Finished fetching data in {elapsedTime} ms");

            return orders;
        }

        public async Task<OrderResponseDto> GetByIdAsync(Guid orderId)
        {
            _logger.LogInformation("Starting to fetch data");

            var stopwatch = Stopwatch.StartNew();

            var order = await _orderService.GetByIdAsync(orderId);

            _logger.LogInformation($"Order: {order.OrderId}");

            stopwatch.Stop();

            var elapsedTime = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation($"Finished fetching data in {elapsedTime} ms");

            return order;
        }

        public async Task<OrderResponseDto> CreateAsync(CreateOrderDto orderRequestDto)
        {
            _logger.LogInformation("Starting to create data");

            var stopwatch = Stopwatch.StartNew();

            var order = await _orderService.CreateAsync(orderRequestDto);

            _logger.LogInformation($"Order: {order.OrderId}");

            stopwatch.Stop();

            var elapsedTime = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation($"Finished creating data in {elapsedTime} ms");

            return order;
        }

        public async Task<OrderResponseDto> UpdateAsync(Guid orderId, UpdateOrderDto orderRequestDto)
        {
            _logger.LogInformation("Starting to update data");

            var stopwatch = Stopwatch.StartNew();

            var order = await _orderService.UpdateAsync(orderId, orderRequestDto);

            _logger.LogInformation($"Order: {order.OrderId}");

            stopwatch.Stop();

            var elapsedTime = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation($"Finished updating data in {elapsedTime} ms");

            return order;
        }

        public async Task DeleteAsync(Guid orderId)
        {
            _logger.LogInformation("Starting to delete data");

            var stopwatch = Stopwatch.StartNew();

            await _orderService.DeleteAsync(orderId);

            _logger.LogInformation($"Order: {orderId}");

            stopwatch.Stop();

            var elapsedTime = stopwatch.ElapsedMilliseconds;

            _logger.LogInformation($"Finished deleting data in {elapsedTime} ms");
        }
    }
}
