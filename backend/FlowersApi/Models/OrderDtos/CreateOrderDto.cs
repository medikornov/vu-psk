using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.OrderDtos
{
    public class CreateOrderDto
    {
        [Required]
        public Guid? CustomerId { get; set; }

        [Required]
        public OrderStatus? Status { get; set; }

        public decimal? OrderTotal { get; set; }
    }
}
