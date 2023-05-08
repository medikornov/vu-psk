using System.ComponentModel.DataAnnotations;
using DataAccessLayer.Enums;

namespace DataAccessLayer.Entities
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }
        public Guid? CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public DateTime? CreationTime { get; set; }
        public OrderStatus? Status { get; set; }
        public List<OrderItem>? OrderItems { get; set; }
    }
}
