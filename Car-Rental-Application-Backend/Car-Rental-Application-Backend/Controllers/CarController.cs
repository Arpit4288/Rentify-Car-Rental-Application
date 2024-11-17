using Business_Login_Layer.Services;
using Car_Rental_Application_Backend.DTOs;
using Data_Access_Layer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_Application_Backend.Controllers
{   /// <summary>
    /// Controller for handling car-related actions.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly CarService _carService;

        public CarController(CarService carService)
        {
            _carService = carService;
        }


        /// <summary>
        /// Creates a new Car.
        /// </summary>
        /// <param name="carDTO">The Car details.</param>
        /// <returns>The newly created Car.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateCar([FromBody] CarDTO carDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                // Map productDto to a Product entity
                var car = new Car
                {
                    Maker = carDTO.Maker,
                    Model = carDTO.Model,
                    AvailableQuantity = carDTO.AvailableQuantity,
                    ImageUrl = carDTO.ImageUrl,
                    RentalPrice = carDTO.RentalPrice,
                };

                Car newCar = _carService.CreateCar(car);
                return CreatedAtAction(nameof(CreateCar), newCar);
            }
            catch (Exception ex)
            {
                // Handle the exception and return an appropriate error response
                return StatusCode(500, "An error occurred while creating the product");
            }
        }


        /// <summary>
        /// Gets a list of all cars.
        /// </summary>
        /// <returns>A list of cars.</returns>
        [HttpGet]
        public async Task<IActionResult> AllCars()
        {
            try
            {
                IEnumerable<Car> cars = await _carService.GetAllCarsAsync();
                if (!cars.Any())
                {
                    return NoContent();
                }
                return Ok(cars);
            }
            catch (Exception ex)
            {
                // Handle the exception and return an appropriate error response
                return StatusCode(500, "An error occurred while Retrieving the cars");
            }
        }


        /// <summary>
        /// Updates an existing car.
        /// </summary>
        /// <param name="carId">The ID of the car to update.</param>
        /// <param name="updateCarDTO">The updated car data.</param>
        /// <returns>The updated car.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{carId}")]
        public async Task<IActionResult> UpdateCarAsync(int carId, [FromBody] UpdateCarDTO updateCarDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                // Get the product from the facade
                Car car = await _carService.GetCarByIdAsync(carId);

                // Check if the product exists
                if (car == null)
                {
                    return NotFound("Car not found");
                }


                // Only update the properties that are provided in the productDto
                if (!string.IsNullOrEmpty(updateCarDTO.Maker))
                {
                    car.Maker = updateCarDTO.Maker;
                }

                if (!string.IsNullOrEmpty(updateCarDTO.Model))
                {
                    car.Model = updateCarDTO.Model;
                }

                if (updateCarDTO.AvailableQuantity >= 0)
                {
                    car.AvailableQuantity = updateCarDTO.AvailableQuantity;
                }

                if (!string.IsNullOrEmpty(updateCarDTO.ImageUrl))
                {
                    car.ImageUrl = updateCarDTO.ImageUrl;
                }

                if (updateCarDTO.RentalPrice >= 0)
                {
                    car.RentalPrice = updateCarDTO.RentalPrice;
                }

                // Update the product using the facade
                var updatedCar = _carService.UpdateCar(car);

                // Return the updated product
                return Ok(updatedCar);
            }
            catch (Exception)
            {
                // Handle the exception and return an appropriate error response
                return StatusCode(500, "An error occurred while updating the product");
            }
        }

        /// <summary>
        /// Deletes a car by ID.
        /// </summary>
        /// <param name="carId">The ID of the car to delete.</param>
        /// <returns>No content.</returns>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCarAsync(int carId)
        {
            try
            {
                // Get the product from the facade
                Car car = await _carService.GetCarByIdAsync(carId);

                // Check if the product exists
                if (car == null)
                {
                    return NotFound("Car not found");
                }

                _carService.DeleteCar(car);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle the exception and return an appropriate error response
                return StatusCode(500, "An error occurred while Deleting the car");
            }
        }

        /// <summary>
        /// Gets a car by ID.
        /// </summary>
        /// <param name="carId">The ID of the car to retrieve.</param>
        /// <returns>The car with the specified ID.</returns>
        [HttpGet("{carId}")]
        public async Task<IActionResult> GetCarByIdAsync(int carId)
        {
            try
            {
                // Get the product from the facade
                Car car = await _carService.GetCarByIdAsync(carId);

                // Check if the product exists
                if (car == null)
                {
                    return NotFound("Car not found");
                }

                return Ok(car);
            }
            catch (Exception ex)
            {
                // Handle the exception and return an appropriate error response
                return StatusCode(500, "An error occurred while updating the product");
            }
        }
    }
}
