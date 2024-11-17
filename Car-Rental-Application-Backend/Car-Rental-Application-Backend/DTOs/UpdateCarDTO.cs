using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rental_Application_Backend.DTOs
{
    public class UpdateCarDTO
    {
        public string Maker { get; set; }
        public string Model { get; set; }
        public int AvailableQuantity { get; set; }
        public string ImageUrl { get; set; }
        public decimal RentalPrice { get; set; }
    }
}
