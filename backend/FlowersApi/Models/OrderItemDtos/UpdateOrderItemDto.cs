using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.OrderItemDtos
{
    public class UpdateOrderItemDto
    {
        public decimal? Quantity { get; set; }

        public decimal? Weight { get; set; }
    }
}
