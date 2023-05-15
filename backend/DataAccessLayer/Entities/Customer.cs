using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Entities
{
    public class Customer
    {
        [Key]
        public Guid CustomerId { get; set; }
        public DateTime? CreationTime { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? AuthZeroUserId { get; set; }
    }
}
