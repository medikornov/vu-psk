using AutoMapper;
using DataAccessLayer.Entities;
using DataAccessLayer.Helpers;
using DataAccessLayer.Repositories.RepositoryWrapper;
using FlowersApi.Models.OrderDtos;
using FlowersApi.Wrappers;

namespace FlowersApi.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderService> _logger;

        public OrderService(IRepositoryWrapper repository, IMapper mapper, ILogger<OrderService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
        }

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

        public async Task<OrderResponseDto> UpdateAsync(Guid orderId, UpdateOrderDto dto)
        {
            try
            {
                var order = await GetOrderAsync(orderId);

                // Copy dto to order and save
                _mapper.Map(dto, order);
                _repository.Orders.Update(order);
                await _repository.SaveAsync();

                return _mapper.Map<OrderResponseDto>(order);
            }
            catch (Exception ex)
            {
                _logger.LogError(44404, ex, "OrderService UpdateAsync caused an exception");
                throw;
            }
        }

        public async Task DeleteAsync(Guid orderId)
        {
            try
            {
                var order = await GetOrderAsync(orderId);

                _repository.Orders.Delete(order);
                await _repository.SaveAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(44405, ex, "OrderService DeleteAsync caused an exception");
                throw;
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
    }
}
