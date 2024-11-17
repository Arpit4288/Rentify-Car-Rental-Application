using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.DataContext;
using Data_Access_Layer.Entities;
using Data_Access_Layer.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.Repositories
{
    /// <summary>
    /// Provides an implementation of the <see cref="IUserRepository"/> interface.
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc />
        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        /// <inheritdoc />
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        /// <inheritdoc />
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        /// <inheritdoc />
        public void Add(User user)
        {
            _context.Users.Add(user);
        }

        /// <inheritdoc />
        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        /// <inheritdoc />
        public void Remove(User user)
        {
            _context.Users.Remove(user);
        }

        /// <inheritdoc />
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
