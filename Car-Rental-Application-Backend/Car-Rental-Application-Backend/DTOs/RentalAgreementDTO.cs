using Data_Access_Layer.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rental_Application_Backend.DTOs
{
    public class RentalAgreementDTO
    {

        [Required(ErrorMessage = "Card Id is required")]
        public int CarId { get; set; }

        [Required(ErrorMessage = "User Id is required")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Start Date is required")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End Date is required")]
        public DateTime EndDate { get; set; }

    }

}
