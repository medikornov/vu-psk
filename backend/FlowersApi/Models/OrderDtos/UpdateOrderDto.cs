using DataAccessLayer.Enums;

namespace FlowersApi.Models.OrderDtos
{
    public class UpdateOrderDto
    {
        public OrderStatus? Status { get; set; }

        public decimal? OrderTotal { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }
    }
}
