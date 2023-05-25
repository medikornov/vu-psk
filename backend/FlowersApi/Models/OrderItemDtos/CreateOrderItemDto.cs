using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.OrderItemDtos
{
    public class CreateOrderItemDto
    {
        [Required]
        public Guid? OrderId { get; set; }

        [Required]
        public Guid? ItemId { get; set; }

        [Required]
        public decimal? Quantity { get; set; }

        public decimal? Weight { get; set; }
    }
}
