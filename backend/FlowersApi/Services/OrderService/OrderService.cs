using AutoMapper;
using DataAccessLayer.Entities;
using DataAccessLayer.Enums;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryWrapper;
using FlowersApi.Helpers;
using FlowersApi.Models.OrderDtos;
using FlowersApi.Services.OrderItemService;
using FlowersApi.Wrappers;

namespace FlowersApi.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IOrderItemService _orderItemService;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderService> _logger;

        public OrderService(IRepositoryWrapper repository, IOrderItemService orderItemService, IMapper mapper, ILogger<OrderService> logger)
        {
            _repository = repository;
            _orderItemService = orderItemService;
            _mapper = mapper;
            _logger = logger;
        }

        [LoggingAspect]
        public async Task<PagedResponse<IEnumerable<OrderResponseDto>>> GetAllAsync(PaginationFilter filter)
        {
            try
            {
                var orders = await _repository.Orders.GetAllAsync(filter);

                double totalRecords = await _repository.Orders.CountAsync();
                var totalPages = Math.Ceiling(totalRecords / filter.PageSize);

                var orderResponses = _mapper.Map<IList<OrderResponseDto>>(orders);

                return new PagedResponse<IEnumerable<OrderResponseDto>>(orderResponses, filter.PageNumber, filter.PageSize, (int)totalPages, (int)totalRecords);
            }
            catch (Exception ex)
            {
                _logger.LogError(44401, ex, "OrderService GetAllAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<PagedResponse<IEnumerable<OrderResponseDto>>> GetAllByCustomerIdAsync(Guid customerId, PaginationFilter filter)
        {
            try
            {
                var orders = await _repository.Orders.GetAllByCustomerIdAsync(customerId, filter);

                double totalRecords = await _repository.Orders.CountByCustomerIdAsync(customerId);
                var totalPages = Math.Ceiling(totalRecords / filter.PageSize);

                var orderResponses = _mapper.Map<IList<OrderResponseDto>>(orders);

                return new PagedResponse<IEnumerable<OrderResponseDto>>(orderResponses, filter.PageNumber, filter.PageSize, (int)totalPages, (int)totalRecords);
            }
            catch (Exception ex)
            {
                _logger.LogError(44401, ex, "OrderService GetAllByCustomerIdAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<OrderResponseDto> GetByIdAsync(Guid orderId)
        {
            try
            {
                var order = await GetOrderAsync(orderId);
                return _mapper.Map<OrderResponseDto>(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(44402, ex, "OrderService GetByIdAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<OrderResponseDto> CreateAsync(CreateOrderDto dto)
        {
            try
            {
                var order = _mapper.Map<Order>(dto);
                order.OrderId = Guid.NewGuid();
                order.CreationTime = DateTime.UtcNow;

                //Check if customer exists for order
                if (dto.CustomerId == null) 
                { 
                    throw new InvalidOperationException("No customer id provided.");
                }

                var orderCustomer = await GetCustomerAsync((Guid)order.CustomerId!);

                // Check if there are any customer order started
                if (await _repository.Orders.AnyAsync(o => o.CustomerId == order.CustomerId && o.Status == OrderStatus.Created))
                {
                    throw new AppException($"Customer {orderCustomer.FirstName} {orderCustomer.LastName} already has an order created.");
                }

                _repository.Orders.Add(order);
                await _repository.SaveAsync();

                return _mapper.Map<OrderResponseDto>(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(44403, ex, "OrderService CreateAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<OrderResponseDto> UpdateAsync(Guid orderId, UpdateOrderDto dto)
        {
            using(var transaction = await _repository.BeginTransactionAsync())
            {
                try
                {
                    var order = await GetOrderAsync(orderId);

                    // If order is completed
                    if (order.Status == OrderStatus.Completed)
                    {
                        throw new AppException($"Order {orderId} is finished and cannot be updated.");
                    }

                    // If updated order is completed
                    if (dto.Status == OrderStatus.Completed)
                    {
                        // Get all order items
                        var orderItems = await _orderItemService.GetAllByOrderIdAsync(orderId);

                        foreach (var orderItem in orderItems)
                        {
                            // Get item from order item and reduce its quanity by the order item quantity
                            var item = await GetItemAsync((Guid)orderItem.ItemId!);
                            item.Quantity -= orderItem.Quantity;

                            // Check that it is not less than 0, else throw exception
                            if (item.Quantity < 0)
                            {
                                throw new AppException($"Item {item.ItemId} has less quantity than order item {orderItem.OrderItemId}");
                            }

                            // Update item
                            _repository.Items.Update(item);
                            await _repository.SaveAsync();
                        }
                    }

                    // Copy dto to order
                    _mapper.Map(dto, order);
                    _repository.Orders.Update(order);
                    await _repository.SaveAsync();

                    await transaction.CommitAsync();

                    return _mapper.Map<OrderResponseDto>(order);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(44404, ex, "OrderService UpdateAsync caused an exception");
                    throw;
                }
            }
        }

        [LoggingAspect]
        public async Task DeleteAsync(Guid orderId)
        {
            using(var transaction = await _repository.BeginTransactionAsync())
            {
                try
                {
                    var order = await GetOrderAsync(orderId);

                    var orderItems = await _repository.OrderItems.GetAllByOrderIdAsync(orderId);

                    foreach (var orderItem in orderItems)
                    {
                        _repository.OrderItems.Delete(orderItem);
                    }

                    _repository.Orders.Delete(order);
                    await _repository.SaveAsync();

                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError(44405, ex, "OrderService DeleteAsync caused an exception");
                    throw;
                }
            }
        }

        private async Task<Order> GetOrderAsync(Guid orderId)
        {
            var order = await _repository.Orders.FindAsync(orderId);

            if (order == null)
            {
                throw new KeyNotFoundException($"Order with id {orderId} not found");
            }

            return order;
        }

        private async Task<Customer> GetCustomerAsync(Guid customerId)
        {
            var customer = await _repository.Customers.FindAsync(customerId);

            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with id {customerId} not found");
            }

            return customer;
        }

        private async Task<Item> GetItemAsync(Guid itemId)
        {
            var item = await _repository.Items.FindAsync(itemId);

            if (item == null)
            {
                throw new KeyNotFoundException($"Item with id {itemId} not found");
            }

            return item;
        }
    }
}
