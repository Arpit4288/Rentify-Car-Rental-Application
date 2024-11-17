using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Data_Access_Layer.Entities
{
    public  class RentalAgreement
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Card Id is required")]
        public int CarId { get; set; }

        [Required(ErrorMessage ="User Id is required")]
        public int UserId { get; set; }

        [Required(ErrorMessage ="Start Date is required")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End Date is required")]
        public DateTime EndtDate { get; set; }

        [Required(ErrorMessage ="Rental Duration is required")]
        public double RentalDurationinDays { get; set; }

        [Required(ErrorMessage ="Total Cost is required")]
        public decimal TotalCost { get; set; }

        [Required(ErrorMessage ="Agreement Status is required")]
        public string AgreementStatus { get; set; }

        [JsonIgnore]
        public virtual Car Car { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
