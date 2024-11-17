using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.Entities;

namespace Data_Access_Layer.Repositories.Contracts
{
    /// <summary>
    /// Represents a repository for managing Rental Agreement entities.
    /// </summary>
    public interface IRentalAgreementRepository
    {
        // <summary>
        /// Retrieves a Rental Agreement entity by its unique identifier asynchronously.
        /// </summary>
        /// <param name="id">The unique identifier of the Rental Agreement.</param>
        /// <returns>The Rental Agreement entity if found, otherwise null.</returns>
        Task<RentalAgreement> GetByIdAsync(int id);

        /// <summary>
        /// Retrieves Rental Agreement entities by user ID asynchronously.
        /// </summary>
        /// <param name="userId">The user's unique identifier.</param>
        /// <returns>A collection of Rental Agreement entities associated with the user.</returns>
        Task<IEnumerable<RentalAgreement>> GetByUserIdAsync(int userId);

        /// <summary>
        /// Retrieves Rental Agreement entities by car ID asynchronously.
        /// </summary>
        /// <param name="carId">The car's unique identifier.</param>
        /// <returns>A collection of Rental Agreement entities associated with the car.</returns>
        Task<IEnumerable<RentalAgreement>> GetByCarId(int carId);

        /// <summary>
        /// Retrieves Rental Agreement entities by both user ID and car ID asynchronously.
        /// </summary>
        /// <param name="userId">The user's unique identifier.</param>
        /// <param name="carId">The car's unique identifier.</param>
        /// <returns>A collection of Rental Agreement entities matching the user and car.</returns>
        Task<IEnumerable<RentalAgreement>> GetByUserIdAndCarIdAsync(int userId, int carId);

        /// <summary>
        /// Retrieves all Rental Agreement entities asynchronously.
        /// </summary>
        /// <returns>A collection of all Rental Agreement entities.</returns>
        Task<IEnumerable<RentalAgreement>> GetAllAsync();

        /// <summary>
        /// Adds a new Rental Agreement entity to the repository.
        /// </summary>
        /// <param name="rentalAgreement">The Rental Agreement entity to add.</param>
        /// <returns>The added Rental Agreement entity.</returns>
        RentalAgreement Add(RentalAgreement rentalAgreement);

        /// <summary>
        /// Updates an existing Rental Agreement entity in the repository.
        /// </summary>
        /// <param name="rentalAgreement">The Rental Agreement entity to update.</param>
        /// <returns>The updated Rental Agreement entity.</returns>
        RentalAgreement Update(RentalAgreement rentalAgreement);

        /// <summary>
        /// Removes a Rental Agreement entity from the repository.
        /// </summary>
        /// <param name="rentalAgreement">The Rental Agreement entity to remove.</param>
        void Remove(RentalAgreement rentalAgreement);
    }
}
