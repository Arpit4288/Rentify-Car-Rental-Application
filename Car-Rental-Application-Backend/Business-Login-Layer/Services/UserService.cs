using Data_Access_Layer.Entities;
using Data_Access_Layer.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Login_Layer.Services
{
    /// <summary>
    /// Service class for managing user-related operations.
    /// </summary>
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="userRepository">The user repository to use.</param>
        /// <param name="unitOfWork">The unit of work for database operations.</param>
        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get a user by their ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the user to retrieve.</param>
        /// <returns>The user with the specified ID, or null if not found.</returns>

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Get a user by their email address asynchronously.
        /// </summary>
        /// <param name="email">The email address of the user to retrieve.</param>
        /// <returns>The user with the specified email address, or null if not found.</returns>
        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        /// <summary>
        /// Get all users asynchronously.
        /// </summary>
        /// <returns>A collection of all users.</returns>
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        /// <summary>
        /// Create a new user.
        /// </summary>
        /// <param name="user">The user to create.</param>
        public void CreateUser(User user)
        {
            _userRepository.Add(user);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
        }

        /// <summary>
        /// Update an existing user.
        /// </summary>
        /// <param name="user">The user to update.</param>
        public void UpdateUser(User user)
        {
            _userRepository.Update(user);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
        }

        /// <summary>
        /// Delete a user.
        /// </summary>
        /// <param name="user">The user to delete.</param>
        public void DeleteUser(User user)
        {
            _userRepository.Remove(user);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
        }
    }

}
