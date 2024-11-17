using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rental_Application_Backend.DTOs
{
    public class CarDTO
    {
        [Required]
        public string Maker { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public int AvailableQuantity { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public decimal RentalPrice { get; set; }
    }

}
