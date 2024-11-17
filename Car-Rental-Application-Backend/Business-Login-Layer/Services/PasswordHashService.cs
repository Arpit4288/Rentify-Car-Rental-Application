using System;
using System.Collections.Generic;
using System.Text;
using BCrypt.Net;


namespace Business_Login_Layer.Services
{
    /// <inheritdoc />
    public class PasswordHashService
    {
        /// <inheritdoc />
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        /// <inheritdoc />
        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
