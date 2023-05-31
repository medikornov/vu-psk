using AutoMapper;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.RepositoryWrapper;
using FlowersApi.Helpers;
using FlowersApi.Models.OrderItemDtos;

namespace FlowersApi.Services.OrderItemService
{
    public class OrderItemService : IOrderItemService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderItemService> _logger;

        public OrderItemService(IRepositoryWrapper repository, IMapper mapper, ILogger<OrderItemService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

        [LoggingAspect]
        public async Task<IEnumerable<OrderItemResponseDto>> GetAllByOrderIdAsync(Guid orderId)
        {
            try
            {
                var orderItems = await _repository.OrderItems.GetAllByOrderIdAsync(orderId);

                foreach (var orderItem in orderItems)
                {
                    orderItem.Item = await _repository.Items.FindAsync((Guid)orderItem.ItemId!);
                }

                return _mapper.Map<IEnumerable<OrderItemResponseDto>>(orderItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(55401, ex, "OrderItemService GetAllByOrderIdAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<OrderItemResponseDto> GetByIdAsync(Guid orderItemId)
        {
            try
            {
                var orderItem = await GetOrderItemAsync(orderItemId);
                return _mapper.Map<OrderItemResponseDto>(orderItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(55402, ex, "OrderItemService GetByIdAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<OrderItemResponseDto> CreateAsync(CreateOrderItemDto dto)
        {
            try
            {
                var orderItem = _mapper.Map<OrderItem>(dto);

                //Check if order exists for orderItem
                if (dto.OrderId == null)
                {
                    throw new InvalidOperationException("No order id provided.");
                }

                //Check if items exists for orderItem
                if (dto.ItemId == null)
                {
                    throw new InvalidOperationException("No item id provided.");
                }

                var order = await GetOrderAsync((Guid)orderItem.OrderId!);

                // Check if order item already exists
                var orderItems = await GetAllByOrderIdAsync(order.OrderId);

                await RecalculateOrderTotalAsync(order, orderItems, dto.Quantity, dto.ItemId);

                if (orderItems != null && orderItems.Any())
                {
                    foreach (var orderItemInOrder in orderItems)
                    {
                        if (orderItemInOrder.ItemId == dto.ItemId)
                        {
                            var orderItemOld = await GetOrderItemAsync(orderItemInOrder.OrderItemId);
                            orderItemOld.Quantity += dto.Quantity;
                            _repository.OrderItems.Update(orderItemOld);
                            await _repository.SaveAsync();
                            
                            return _mapper.Map<OrderItemResponseDto>(orderItemOld);
                        }
                    }
                }

                orderItem.OrderItemId = Guid.NewGuid();

                // Check if item exists
                var item = await GetItemAsync((Guid)orderItem.ItemId!);

                _repository.OrderItems.Add(orderItem);
                await _repository.SaveAsync();

                return _mapper.Map<OrderItemResponseDto>(orderItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(55403, ex, "OrderItemService CreateAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task<OrderItemResponseDto> UpdateAsync(Guid orderItemId, UpdateOrderItemDto dto)
        {
            try
            {
                var orderItem = await GetOrderItemAsync(orderItemId);
                var order = await GetOrderAsync((Guid)orderItem.OrderId!);

                _mapper.Map(dto, orderItem);
                _repository.OrderItems.Update(orderItem);

                var orderItems = await GetAllByOrderIdAsync(order.OrderId);
                decimal? total = 0;

                foreach (var orderItemInOrder in orderItems)
                {
                    total += orderItemInOrder.Item!.Price * orderItemInOrder.Quantity;
                }

                order.OrderTotal = total;
                _repository.Orders.Update(order);

                await _repository.SaveAsync();

                return _mapper.Map<OrderItemResponseDto>(orderItem);
            }
            catch (Exception ex)
            {
                _logger.LogError(55404, ex, "OrderItemService UpdateAsync caused an exception");
                throw;
            }
        }

        [LoggingAspect]
        public async Task DeleteAsync(Guid orderItemId)
        {
            try
            {
                var orderItem = await GetOrderItemAsync(orderItemId);
                _repository.OrderItems.Delete(orderItem);
                await _repository.SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(44405, ex, "OrderItemService DeleteAsync caused an exception");
                throw;
            }
        }

        private async Task<OrderItem> GetOrderItemAsync(Guid orderItemId)
        {
            var orderItem = await _repository.OrderItems.FindAsync(orderItemId);

            if (orderItem == null)
            {
                throw new KeyNotFoundException($"OrderItem with id {orderItemId} not found");
            }

            return orderItem;
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

        private async Task<Item> GetItemAsync(Guid itemId)
        {
            var item = await _repository.Items.FindAsync(itemId);

            if (item == null)
            {
                throw new KeyNotFoundException($"Item with id {itemId} not found");
            }

            return item;
        }

        private async Task RecalculateOrderTotalAsync(Order order, IEnumerable<OrderItemResponseDto> orderItems, decimal? dtoQuantity, Guid? dtoItemId)
        {
            var dtoItem = await _repository.Items.FindAsync(dtoItemId!);
            decimal? total = 0;

            foreach (var orderItem in orderItems)
            {
                total += orderItem.Item!.Price * orderItem.Quantity;
            }

            total += dtoQuantity * dtoItem!.Price;

            order.OrderTotal = total;
            _repository.Orders.Update(order);
        }
    }
}
