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
    /// Provides an implementation of the <see cref="IRentalAgreementRepository"/> interface.
    /// </summary>
    public class RentalAgreementRepository : IRentalAgreementRepository
    {
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="RentalAgreementRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public RentalAgreementRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc />
        public async Task<RentalAgreement> GetByIdAsync(int id)
        {
            return await _context.RentalAgreements.FindAsync(id);
        }

        /// <inheritdoc />
        public async Task<IEnumerable<RentalAgreement>> GetByUserIdAsync(int userId)
        {
            return await _context.RentalAgreements
                .Where(r => r.UserId == userId)
                .ToListAsync();

        }

        /// <inheritdoc />
        public async Task<IEnumerable<RentalAgreement>> GetByCarId(int carId)
        {
            return await _context.RentalAgreements
                .Where(r => r.CarId == carId)
                .ToListAsync();
        }

        /// <inheritdoc />
        public async Task<IEnumerable<RentalAgreement>> GetByUserIdAndCarIdAsync(int userId, int carId)
        {
            return await _context.RentalAgreements
                .Where(r => r.UserId == userId &&  r.CarId == carId)
                .ToListAsync();
        }

        /// <inheritdoc />
        public async Task<IEnumerable<RentalAgreement>> GetAllAsync()
        {
            return await _context.RentalAgreements.ToListAsync();
        }

        /// <inheritdoc />
        public RentalAgreement Add(RentalAgreement rentalAgreement)
        {
            _context.RentalAgreements.Add(rentalAgreement);
            return rentalAgreement;
        }

        /// <inheritdoc />
        public RentalAgreement Update(RentalAgreement rentalAgreement)
        {
            _context.Entry(rentalAgreement).State = EntityState.Modified;
            return rentalAgreement;
        }

        /// <inheritdoc />
        public void Remove(RentalAgreement rentalAgreement)
        {
            _context.RentalAgreements.Remove(rentalAgreement);
        }

        /// <inheritdoc />
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
