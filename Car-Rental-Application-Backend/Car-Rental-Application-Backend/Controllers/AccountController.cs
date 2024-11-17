using Business_Login_Layer.Services;
using Car_Rental_Application_Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_Application_Backend.Controllers
{

    /// <summary>
    /// Controller for handling user account-related actions.
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserService _userService;
        private readonly PasswordHashService _passwordHashService;
        private readonly TokenService _tokenService;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="userService">The user service for managing user-related operations.</param>
        /// <param name="passwordHashService">The password hash service for password-related operations.</param>
        /// <param name="tokenService">The token service for generating authentication tokens.</param>
        public AccountController(UserService userService, PasswordHashService passwordHashService, TokenService tokenService)
        {
            _userService = userService;
            _passwordHashService = passwordHashService;
            _tokenService = tokenService;
        }

        /// <summary>
        /// Handles user login and generates an authentication token upon successful login.
        /// </summary>
        /// <param name="userLogin">The user login data including email and password.</param>
        /// <returns>An authentication token and user information upon successful login, or an error response.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO userLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Authenticate the user
            var user = await _userService.GetUserByEmailAsync(userLogin.Email);
            if (user == null || !_passwordHashService.VerifyPassword(userLogin.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            // Generate the token
            var token = _tokenService.GenerateToken(user.Id, user.Role);

            // Create a response DTO with the token and role information
            var response = new
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                Token = token
            };

            // Return the response
            return Ok(response);
        }
    }
}
