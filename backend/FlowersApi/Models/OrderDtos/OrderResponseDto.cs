using DataAccessLayer.Entities;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.OrderDtos
{
    public class OrderResponseDto
    {
        public Guid OrderId { get; set; }
        public Guid? CustomerId { get; set; }
        public DateTime? CreationTime { get; set; }
        public OrderStatus? Status { get; set; }
        public decimal? OrderTotal { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}
