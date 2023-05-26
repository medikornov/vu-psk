using DataAccessLayer.Enums;

namespace FlowersApi.Models.ItemDtos
{
    public class UpdateItemDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal? Quantity { get; set; }

        public QuantityType QuantityType { get; set; }

        public decimal? Price { get; set; }

        public string? PhotoUrl { get; set; }

        public decimal? Weight { get; set; }
    }
}
