using System.ComponentModel.DataAnnotations;
using DataAccessLayer.Enums;

namespace DataAccessLayer.Entities
{
    public class Item
    {
        [Key]
        public Guid ItemId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Quantity { get; set; }
        public QuantityType QuantityType { get; set; }
        public decimal? Price { get; set; }
        public string? PhotoName { get; set; }
        public string? PhotoContentType { get; set; }
        public byte[]? PhotoContent { get; set; }
        public decimal? Weight { get; set; }

        [Timestamp]
        public byte[] Version { get; set; }
    }
}
