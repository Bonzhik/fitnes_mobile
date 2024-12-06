using DAL.Context;
using DAL.Repositories.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _db.Users.SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> GetByRefreshTokenAsync(string refreshToken)
        {
            return await _db.Users.SingleOrDefaultAsync(x => x.RefreshToken == refreshToken);
        }
    }
}
