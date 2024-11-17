using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.Entities;
using Data_Access_Layer.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Business_Login_Layer.Services
{
    /// <summary>
    /// Service class for managing rental agreements.
    /// </summary>
    public class RentalAgreementService
    {
        private readonly IRentalAgreementRepository _rentalAgreementRepository;
        private readonly IUnitOfWork _unitOfWork;

        public RentalAgreementService(IRentalAgreementRepository rentalAgreementRepository, IUnitOfWork unitOfWork)
        {
            _rentalAgreementRepository = rentalAgreementRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get a rental agreement by its ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the rental agreement to retrieve.</param>
        /// <returns>The rental agreement with the specified ID, or null if not found.</returns>
        public async Task<RentalAgreement> GetRentalAgreementByIdAsync(int id)
        {
            return await _rentalAgreementRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Get all rental agreements asynchronously.
        /// </summary>
        /// <returns>A collection of all rental agreements.</returns>
        public async Task<IEnumerable<RentalAgreement>> GetAllRentalAgreementsAsync()
        {
            return await _rentalAgreementRepository.GetAllAsync();
        }


        /// <summary>
        /// Get all rental agreements for a specific user asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A collection of rental agreements for the user.</returns>
        public async Task<IEnumerable<RentalAgreement>> GetAllRentalAgreementByUserId(int userId){
            return await _rentalAgreementRepository.GetByUserIdAsync(userId);
        }

        /// <summary>
        /// Get all rental agreements for a specific car asynchronously.
        /// </summary>
        /// <param name="carId">The ID of the car.</param>
        /// <returns>A collection of rental agreements for the car.</returns>

        public async Task<IEnumerable<RentalAgreement>> GetAllRentalAgreementByCarId(int carId)
        {
            return await _rentalAgreementRepository.GetByCarId(carId);
        }

        /// <summary>
        /// Get all rental agreements for a specific user and car asynchronously.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <param name="carId">The ID of the car.</param>
        /// <returns>A collection of rental agreements for the user and car.</returns>
        public async Task<IEnumerable<RentalAgreement>> GetAllRentalAgreementByUserIdAndCarIdAsync(int userId, int carId)
        {
            return await _rentalAgreementRepository.GetByUserIdAndCarIdAsync(userId, carId);
        }

        /// <summary>
        /// Create a new rental agreement.
        /// </summary>
        /// <param name="rentalAgreement">The rental agreement to create.</param>
        /// <returns>The created rental agreement.</returns>

        public RentalAgreement CreateRentalAgreement(RentalAgreement rentalAgreement)
        {
            RentalAgreement createdRentalAgreement = _rentalAgreementRepository.Add(rentalAgreement);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
            return createdRentalAgreement;

        }

        /// <summary>
        /// Update an existing rental agreement.
        /// </summary>
        /// <param name="rentalAgreement">The rental agreement to update.</param>
        /// <returns>The updated rental agreement.</returns>
        public RentalAgreement UpdateRentalAgreement(RentalAgreement rentalAgreement)
        {
            RentalAgreement updatedRentalAgreement = _rentalAgreementRepository.Update(rentalAgreement);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
            return updatedRentalAgreement;
        }

        /// <summary>
        /// Delete a rental agreement.
        /// </summary>
        /// <param name="rentalAgreement">The rental agreement to delete.</param>
        public void DeleteRentalAgreement(RentalAgreement rentalAgreement)
        {
            _rentalAgreementRepository.Remove(rentalAgreement);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
        }
    }

}
