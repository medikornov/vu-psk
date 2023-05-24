using DataAccessLayer.Entities;

namespace FlowersApi.Models.OrderItemDtos
{
    public class OrderItemResponseDto
    {
        public Guid OrderItemId { get; set; }
        public Guid? OrderId { get; set; }
        public Guid? ItemId { get; set; }
        public Item? Item { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Weight { get; set; }
    }
}
