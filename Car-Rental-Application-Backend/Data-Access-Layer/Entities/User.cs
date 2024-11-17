using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Data_Access_Layer.Entities
{
    public  class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Full Name is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Full Name must be between 1 and 100 characters")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone Number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone Number must be a 10-digit number")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string PasswordHash { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; }

        [JsonIgnore]
        public virtual ICollection<RentalAgreement> RentalAgreements { get; set;}

    }
}
