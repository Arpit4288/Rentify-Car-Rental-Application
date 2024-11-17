using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.Entities;

namespace Data_Access_Layer.Repositories.Contracts
{
    /// <summary>
    /// Represents a repository for managing Car entities.
    /// </summary>
    public interface ICarRepository
    {
        /// <summary>
        /// Retrieves a Car entity by its unique identifier asynchronously.
        /// </summary>
        /// <param name="id">The unique identifier of the Car.</param>
        /// <returns>The Car entity if found, otherwise null.</returns>
        Task<Car> GetByIdAsync(int id);

        /// <summary>
        /// Retrieves all Car entities asynchronously.
        /// </summary>
        /// <returns>A collection of all Car entities.</returns>
        Task<IEnumerable<Car>> GetAllAsync();

        /// <summary>
        /// Adds a new Car entity to the repository.
        /// </summary>
        /// <param name="car">The Car entity to add.</param>
        /// <returns>The added Car entity.</returns>
        Car Add(Car car);

        /// <summary>
        /// Updates an existing Car entity in the repository.
        /// </summary>
        /// <param name="car">The Car entity to update.</param>
        /// <returns>The updated Car entity.</returns>
        Car Update(Car car);

        /// <summary>
        /// Removes a Car entity from the repository.
        /// </summary>
        /// <param name="car">The Car entity to remove.</param>
        void Remove(Car car);
    }
    
}
