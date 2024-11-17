using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data_Access_Layer.DataContext;
using Data_Access_Layer.Repositories.Contracts;

namespace Data_Access_Layer.Repositories
{
    /// <summary>
    /// Provides an implementation of the <see cref="IUnitOfWork"/> interface.
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        /// <inheritdoc />
        public IUserRepository UserRepository { get; }

        /// <inheritdoc />
        public ICarRepository CarRepository { get; }

        /// <inheritdoc />
        public IRentalAgreementRepository RentalAgreementRepository { get; }

        /// <inheritdoc />
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            UserRepository = new UserRepository(context);
            CarRepository = new CarRepository(context);
            RentalAgreementRepository = new RentalAgreementRepository(context);
        }

        /// <inheritdoc />
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
