using Business_Login_Layer.Services;
using Car_Rental_Application_Backend.DTOs;
using Data_Access_Layer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_Application_Backend.Controllers
{
    /// <summary>
    /// Controller for handling rental agreement-related actions.
    /// </summary>
    [ApiController]
    [Route("api/v1/[Controller]")]
    public class RentalAgreementController : ControllerBase
    {
        private readonly RentalAgreementService _rentalAgreementService;
        private readonly CarService _carService;
        private readonly UserService _userService;

        public RentalAgreementController(RentalAgreementService rentalAgreementService, CarService carService, UserService userService)
        {
            _rentalAgreementService = rentalAgreementService;
            _carService = carService;
            _userService = userService;
        }


        /// <summary>
        /// Gets a list of all rental agreements.
        /// </summary>
        /// <returns>A list of rental agreements.</returns>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllRentalAgreement()
        {
            try
            {
                IEnumerable<RentalAgreement> rentalAgreements = await _rentalAgreementService.GetAllRentalAgreementsAsync();
                List<RentalAgreementWithCarDTO> rentalAgreementsWithCar = new List<RentalAgreementWithCarDTO>();
                foreach (var rentalAgreement in rentalAgreements)
                {
                    Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);
                    var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                    {
                        rentalAgreement = rentalAgreement,
                        car = car
                    };
                    rentalAgreementsWithCar.Add(rentalAgreementWithCar);
                }
                return Ok(rentalAgreementsWithCar);
            }
            catch (Exception)
            {

                return BadRequest("An error occured during creating the Rental Agreement");
            }
        }



        /// <summary>
        /// Gets a rental agreement by its ID.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to retrieve.</param>
        /// <returns>The rental agreement with the specified ID.</returns>
        [Authorize]
        [HttpGet("agreementId/{rentalAgreementId}")]
        public async Task<IActionResult> GetRentalAgreementById(int rentalAgreementId)
        {
            try
            {
                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);
                if (rentalAgreement == null)
                {
                    return NotFound("Agreement Not Found");
                }
                Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);
                var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                {
                    rentalAgreement = rentalAgreement,
                    car = car
                };
                return Ok(rentalAgreementWithCar);
            }
            catch (Exception)
            {

                return BadRequest("An error occured during creating the Rental Agreement");
            }
        }

        /// <summary>
        /// Gets a list of rental agreements for a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user for whom to retrieve rental agreements.</param>
        /// <returns>A list of rental agreements for the specified user.</returns>
        [Authorize]
        [HttpGet("userId/{userId}")]
        public async Task<IActionResult> GetAllRentalAgreementsByUserId(int userId)
        {
            try
            {
                IEnumerable<RentalAgreement> rentalAgreements = await _rentalAgreementService.GetAllRentalAgreementByUserId(userId);
                List<RentalAgreementWithCarDTO> rentalAgreementsWithCar = new List<RentalAgreementWithCarDTO>();
                foreach (var rentalAgreement in rentalAgreements)
                {
                    Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);
                    var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                    {
                        rentalAgreement = rentalAgreement,
                        car = car
                    };
                    rentalAgreementsWithCar.Add(rentalAgreementWithCar);
                }
                return Ok(rentalAgreementsWithCar);
            }
            catch (Exception)
            {

                return BadRequest("An error occured during creating the Rental Agreement");
            }
        }

        /// <summary>
        /// Gets a list of rental agreements for a specific car.
        /// </summary>
        /// <param name="carId">The ID of the car for which to retrieve rental agreements.</param>
        /// <returns>A list of rental agreements for the specified car.</returns>
        [Authorize]
        [HttpGet("carId/{carId}")]
        public async Task<IActionResult> GetAllRentalAgreementsByCarId(int carId)
        {
            try
            {
                IEnumerable<RentalAgreement> rentalAgreements = await _rentalAgreementService.GetAllRentalAgreementByCarId(carId);
                if (!rentalAgreements.Any() || rentalAgreements == null)
                {
                    return NotFound("No Agreements Found for this Car");

                }
                List<RentalAgreementWithCarDTO> rentalAgreementsWithCar = new List<RentalAgreementWithCarDTO>();
                foreach (var rentalAgreement in rentalAgreements)
                {
                    Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);
                    var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                    {
                        rentalAgreement = rentalAgreement,
                        car = car
                    };
                    rentalAgreementsWithCar.Add(rentalAgreementWithCar);
                }
                return Ok(rentalAgreementsWithCar);
            }
            catch (Exception)
            {

                return BadRequest("An error occured during creating the Rental Agreement");
            }
        }

        /// <summary>
        /// Creates a new rental agreement.
        /// </summary>
        /// <param name="rentalAgreementDTO">The rental agreement data to create.</param>
        /// <returns>The created rental agreement.</returns>
        [Authorize(Roles = "Regular")]
        [HttpPost]
        public async Task<IActionResult> CreateRentalAgreement([FromBody] RentalAgreementDTO rentalAgreementDTO)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Car car = await _carService.GetCarByIdAsync(rentalAgreementDTO.CarId);
                if (car == null)
                {
                    return BadRequest("Car is Not Available");
                }

                if (car.AvailableQuantity <= 0)
                {
                    return BadRequest("Car is Not Available");
                }


                var rentalAgreement = new RentalAgreement
                {
                    CarId = rentalAgreementDTO.CarId,
                    UserId = rentalAgreementDTO.UserId,
                    StartDate = rentalAgreementDTO.StartDate,
                    EndtDate = rentalAgreementDTO.EndDate,
                };
                TimeSpan rentalDuration = rentalAgreementDTO.EndDate - rentalAgreementDTO.StartDate;
                int toatalDays = (int)Math.Ceiling(rentalDuration.TotalDays);
                rentalAgreement.RentalDurationinDays = toatalDays;

                rentalAgreement.TotalCost = toatalDays * car.RentalPrice;
                rentalAgreement.AgreementStatus = "Pending";

                RentalAgreement createdRentalAgreement = _rentalAgreementService.CreateRentalAgreement(rentalAgreement);
                car.AvailableQuantity -= 1;  // updating the car Quantity
                _carService.UpdateCar(car);

                var createdAentalAgreementWithCar = new RentalAgreementWithCarDTO
                {
                    rentalAgreement = createdRentalAgreement,
                    car = car
                };
                return CreatedAtAction(nameof(CreateRentalAgreement), createdAentalAgreementWithCar);
            }
            catch (Exception ex)
            {
                return BadRequest("An error occured during creating the Rental Agreement");
            }
        }


        /// <summary>
        /// Updates an existing rental agreement.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to update.</param>
        /// <param name="rentalAgreementDTO">The updated rental agreement data.</param>
        /// <returns>The updated rental agreement.</returns>
        [Authorize]
        [HttpPut("{rentalAgreementId}")]
        public async Task<IActionResult> UpdateRentalAgreement(int rentalAgreementId, [FromBody] RentalAgreementDTO rentalAgreementDTO)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);
                if (rentalAgreement == null)
                {
                    return BadRequest();
                }

                Car car = await _carService.GetCarByIdAsync(rentalAgreementDTO.CarId);
                if (car == null)
                {
                    return BadRequest("Car is Not Available");
                }


                rentalAgreement.StartDate = rentalAgreementDTO.StartDate;
                rentalAgreement.EndtDate = rentalAgreementDTO.EndDate;
                TimeSpan rentalDuration = rentalAgreementDTO.EndDate - rentalAgreementDTO.StartDate;
                int toatalDays = (int)Math.Ceiling(rentalDuration.TotalDays);
                rentalAgreement.RentalDurationinDays = toatalDays;

                rentalAgreement.TotalCost = toatalDays * car.RentalPrice;


                RentalAgreement updatedRentalAgreement = _rentalAgreementService.UpdateRentalAgreement(rentalAgreement);

                var updatedRentalAgreementWithCar = new RentalAgreementWithCarDTO
                {
                    rentalAgreement = updatedRentalAgreement,
                    car = car
                };

                return Ok(updatedRentalAgreementWithCar);
            }
            catch (Exception ex)
            {
                return BadRequest("An error occured during Updating the Rental Agreement");
            }
        }


        /// <summary>
        /// Accepts a rental agreement.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to accept.</param>
        /// <returns>The accepted rental agreement.</returns>
        [Authorize(Roles = "Regular")]
        [HttpPut("accept/{rentalAgreementId}")]
        public async Task<IActionResult> AcceptRentalAgreement(int rentalAgreementId)
        {
            //return Ok("HHHHHfffff");
            try
            {
                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);

                if (rentalAgreement == null)
                {
                    return BadRequest("Agreement Not Found");
                }

                if (rentalAgreement.AgreementStatus != "Pending")
                {
                    return BadRequest("You are not allowed to update it now!");
                }


                rentalAgreement.AgreementStatus = "Accepted";

                _rentalAgreementService.UpdateRentalAgreement(rentalAgreement);
                Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);
                var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                {
                    rentalAgreement = rentalAgreement,
                    car = car
                };
                return Ok(rentalAgreementWithCar);
            }
            catch
            {
                return BadRequest("An error occured during creating the Rental Agreement");
            }

        }


        /// <summary>
        /// Approves a rental agreement by an admin.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to approve.</param>
        /// <returns>The approved rental agreement.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{rentalAgreementId}/approveAgreement")]
        public async Task<IActionResult> AprroveRentalAgreement(int rentalAgreementId)
        {

            try
            {
                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);
                if (rentalAgreement == null)
                {
                    return BadRequest("Agreement Not Found");
                }
                Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);


                if (rentalAgreement.AgreementStatus == "Accepted")
                {
                    rentalAgreement.AgreementStatus = "Approved";

                    _rentalAgreementService.UpdateRentalAgreement(rentalAgreement);

                    var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                    {
                        rentalAgreement = rentalAgreement,
                        car = car
                    };

                    return Ok(rentalAgreementWithCar);
                }

                return BadRequest("You can not make changes now!");

            }
            catch
            {
                return BadRequest("An error occured during creating the Rental Agreement");
            }

        }

        /// <summary>
        /// Approves the return of a rental agreement by an admin.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to approve the return for.</param>
        /// <returns>The approved rental agreement with return status.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPut("{rentalAgreementId}/approveReturn")]
        public async Task<IActionResult> AprroveReturnRentalAgreement(int rentalAgreementId)
        {

            try
            {
                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);
                if (rentalAgreement == null)
                {
                    return BadRequest("Agreement Not Found");
                }
                Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);


                if (rentalAgreement.AgreementStatus == "ReturnRequest")
                {
                    rentalAgreement.AgreementStatus = "Returned";
                    _rentalAgreementService.UpdateRentalAgreement(rentalAgreement);
                    car.AvailableQuantity += 1;
                    _carService.UpdateCar(car);

                    var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                    {
                        rentalAgreement = rentalAgreement,
                        car = car
                    };
                    return Ok(rentalAgreementWithCar);
                }

                return BadRequest("You can you make changes now!");


            }
            catch
            {
                return BadRequest("An error occured during creating the Rental Agreement");
            }

        }
        /// <summary>
        /// Requests to return a rental agreement by a regular user.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to request a return for.</param>
        /// <returns>The rental agreement with return request status.</returns>d
        [Authorize(Roles = "Regular")]
        [HttpPut("{rentalAgreementId}/ReturnRequest")]
        public async Task<IActionResult> ReturnRequestRentalAgreement(int rentalAgreementId)
        {

            try
            {
                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);
                if (rentalAgreement == null)
                {
                    return BadRequest("Agreement Not Found");
                }
                Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);

                if (rentalAgreement.AgreementStatus == "Approved")
                {
                    rentalAgreement.AgreementStatus = "ReturnRequest";

                    _rentalAgreementService.UpdateRentalAgreement(rentalAgreement);
                    var rentalAgreementWithCar = new RentalAgreementWithCarDTO
                    {
                        rentalAgreement = rentalAgreement,
                        car = car
                    };

                    return Ok(rentalAgreementWithCar);
                }


                return BadRequest("You can't return now");


            }
            catch
            {
                return BadRequest("An error occured during creating the Rental Agreement");
            }

        }

        /// <summary>
        /// Deletes a rental agreement by a user, but only if it is in the 'Pending' status.
        /// </summary>
        /// <param name="rentalAgreementId">The ID of the rental agreement to delete.</param>
        /// <returns>NoContent if successful, BadRequest otherwise.</returns>
        [Authorize]
        [HttpDelete("{rentalAgreementId}")]
        public async Task<IActionResult> DeleteRentalAgreement(int rentalAgreementId)
        {

            try
            {
                RentalAgreement rentalAgreement = await _rentalAgreementService.GetRentalAgreementByIdAsync(rentalAgreementId);
                Car car = await _carService.GetCarByIdAsync(rentalAgreement.CarId);
                // if carr will deleted before return then we have to update the car quantity
                if (rentalAgreement == null)
                {
                    return BadRequest("Agreement Not Found");
                }

                if (rentalAgreement.AgreementStatus != "Returned")
                {
                    car.AvailableQuantity += 1;
                    _carService.UpdateCar(car);
                }

                _rentalAgreementService.DeleteRentalAgreement(rentalAgreement);

                return NoContent();
            }
            catch
            {
                return BadRequest("An error occured during creating the Rental Agreement");
            }

        }

    }
}
