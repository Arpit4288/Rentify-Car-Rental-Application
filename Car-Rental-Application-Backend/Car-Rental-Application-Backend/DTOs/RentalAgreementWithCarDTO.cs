using Data_Access_Layer.Entities;

namespace Car_Rental_Application_Backend.DTOs
{
    public class RentalAgreementWithCarDTO
    {
        public RentalAgreement rentalAgreement { get; set; }
        public Car car { get; set; }
    }
}
