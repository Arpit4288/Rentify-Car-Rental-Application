using Data_Access_Layer.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Data_Access_Layer.Entities
{
    public class Car
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Maker Name is required")]
        public string Maker { get; set; }

        [Required(ErrorMessage ="Model of Card is required")]
        public string Model { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        public int AvailableQuantity { get; set; }

        [Required(ErrorMessage = "Image is required")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "Rental price is required")]
        public decimal RentalPrice { get; set; }

        [JsonIgnore]
        public virtual ICollection<RentalAgreement> RentalAgreements { get; set;}
    }
}
