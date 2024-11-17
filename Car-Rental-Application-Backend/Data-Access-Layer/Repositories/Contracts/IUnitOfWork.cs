using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repositories.Contracts
{
    /// <summary>
    /// Represents a unit of work for managing repositories and saving changes.
    /// </summary>
    public interface IUnitOfWork
    {
        /// <summary>
        /// Gets the User Repository.
        /// </summary>
        IUserRepository UserRepository { get; }

        /// <summary>
        /// Gets the Car Repository.
        /// </summary>
        ICarRepository CarRepository { get; }

        /// <summary>
        /// Gets the Rental Agreement Repository.
        /// </summary>
        IRentalAgreementRepository RentalAgreementRepository { get; }

        /// <summary>
        /// Asynchronously saves changes made to the repositories.
        /// </summary>
        /// <returns>The number of entities saved.</returns>
        Task<int> SaveAsync();
    }

}
