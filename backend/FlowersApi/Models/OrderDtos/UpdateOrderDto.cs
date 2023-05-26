using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.OrderDtos
{
    public class UpdateOrderDto
    {
        public OrderStatus? Status { get; set; }

        public decimal? OrderTotal { get; set; }
    }
}
