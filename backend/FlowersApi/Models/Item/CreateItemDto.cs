using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.Item
{
    public class CreateItemDto
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public decimal? Quantity { get; set; }

        [Required]
        public QuantityType QuantityType { get; set; }

        [Required]
        public decimal? Price { get; set; }

        [Required]
        public string? PhotoUrl { get; set; }

        [Required]
        public decimal? Weight { get; set; }
    }
}
