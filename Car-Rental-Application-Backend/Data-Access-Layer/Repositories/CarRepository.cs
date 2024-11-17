using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.DataContext;
using Data_Access_Layer.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer.Repositories.Contracts
{
    /// <summary>
    /// Provides an implementation of the <see cref="ICarRepository"/> interface.
    /// </summary>
    public class CarRepository : ICarRepository
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="CarRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public CarRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc />
        public async Task<Car> GetByIdAsync(int id)
        {
            return await _context.Cars.FindAsync(id);
        }

        /// <inheritdoc />
        public async Task<IEnumerable<Car>> GetAllAsync()
        {
            return await _context.Cars.ToListAsync();
        }

        /// <inheritdoc />
        public Car Add(Car car)
        {
            _context.Cars.Add(car);
            return car;
        }

        /// <inheritdoc />
        public Car Update(Car car)
        {
            _context.Entry(car).State = EntityState.Modified;
            return car;
        }

        /// <inheritdoc />
        public void Remove(Car car)
        {
            _context.Cars.Remove(car);
        }

        /// <inheritdoc />
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
