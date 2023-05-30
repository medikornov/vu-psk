using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.ItemDtos
{
    public class UpdateItemDto
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public decimal? Quantity { get; set; }

        public QuantityType QuantityType { get; set; }

        public decimal? Price { get; set; }

        public IFormFile? Photo { get; set; }

        public decimal? Weight { get; set; }

        [Required]
        public byte[] Version { get; set;}

        [Required]
        public bool IsOverride { get; set; }
    }
}
