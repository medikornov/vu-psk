using System.ComponentModel.DataAnnotations;

namespace FlowersApi.Models.CustomerDtos
{
    public class CreateCustomerDto
    {
        [Required]
        public string? UserName { get; set; }

        public string? Password { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        [Required]
        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        [Required]
        public string? AuthZeroUserId { get; set; }
    }
}
