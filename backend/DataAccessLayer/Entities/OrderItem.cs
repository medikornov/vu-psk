using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Entities
{
    public class OrderItem
    {
        [Key]
        public Guid OrderItemId { get; set; }
        public Guid? OrderId { get; set; }
        public Order? Order { get; set; }
        public Guid? ItemId { get; set; }
        public Item? Item { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Weight { get; set; }
    }
}
