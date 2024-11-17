using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.Entities;

namespace Data_Access_Layer.Repositories.Contracts
{
    /// <summary>
    /// Represents a repository for managing User entities.
    /// </summary>
    public interface IUserRepository
    {
        /// <summary>
        /// Retrieves a User entity by its unique identifier asynchronously.
        /// </summary>
        /// <param name="id">The unique identifier of the User.</param>
        /// <returns>The User entity if found, otherwise null.</returns>
        Task<User> GetByIdAsync(int id);

        /// <summary>
        /// Retrieves a User entity by its email address asynchronously.
        /// </summary>
        /// <param name="email">The email address of the User.</param>
        /// <returns>The User entity if found, otherwise null.</returns>
        Task<User> GetByEmailAsync(string email);

        /// <summary>
        /// Retrieves all User entities asynchronously.
        /// </summary>
        /// <returns>A collection of all User entities.</returns>
        Task<IEnumerable<User>> GetAllAsync();

        /// <summary>
        /// Adds a new User entity to the repository.
        /// </summary>
        /// <param name="user">The User entity to add.</param>
        void Add(User user);

        /// <summary>
        /// Updates an existing User entity in the repository.
        /// </summary>
        /// <param name="user">The User entity to update.</param>
        void Update(User user);

        /// <summary>
        /// Removes a User entity from the repository.
        /// </summary>
        /// <param name="user">The User entity to remove.</param>
        void Remove(User user);
    }

    
}
