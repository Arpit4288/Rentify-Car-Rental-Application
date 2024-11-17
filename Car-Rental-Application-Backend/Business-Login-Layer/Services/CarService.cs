using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.Entities;
using Data_Access_Layer.Repositories.Contracts;

namespace Business_Login_Layer.Services
{
    /// <summary>
    /// Service class for managing cars.
    /// </summary>
    public class CarService
    {
        private readonly ICarRepository _carRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CarService(ICarRepository carRepository, IUnitOfWork unitOfWork)
        {
            _carRepository = carRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Get a car by its ID asynchronously.
        /// </summary>
        /// <param name="id">The ID of the car to retrieve.</param>
        /// <returns>The car with the specified ID, or null if not found.</returns>
        public async Task<Car> GetCarByIdAsync(int id)
        {
            return await _carRepository.GetByIdAsync(id);
        }

        /// <summary>
        /// Get all cars asynchronously.
        /// </summary>
        /// <returns>A collection of all cars.</returns>
        public async Task<IEnumerable<Car>> GetAllCarsAsync()
        {
            return await _carRepository.GetAllAsync();
        }

        /// <summary>
        /// Create a new car.
        /// </summary>
        /// <param name="car">The car to create.</param>
        /// <returns>The created car.</returns>
        public Car CreateCar(Car car)
        {
            Car createdCar = _carRepository.Add(car);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
            return createdCar;
        }

        /// <summary>
        /// Update an existing car.
        /// </summary>
        /// <param name="car">The car to update.</param>
        /// <returns>The updated car.</returns>
        public Car UpdateCar(Car car)
        {
            Car updatedCar = _carRepository.Update(car);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
            return updatedCar;
        }

        /// <summary>
        /// Delete a car.
        /// </summary>
        /// <param name="car">The car to delete.</param>
        public void DeleteCar(Car car)
        {
            _carRepository.Remove(car);
            _unitOfWork.SaveAsync().Wait(); // Wait for the save operation to complete synchronously
        }
    }

}
