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

        public IQueryable<User> GetFiltered(float deltaX, float weight, float height, UserCategory? category, long userId)
        {
            if (category == null)
            {
                return _db.Users.Where(u => u.Weigth > weight - deltaX && u.Weigth < weight + deltaX
                                            &&
                                            u.Height > height - deltaX && u.Height < height + deltaX
                                            &&
                                            u.Id != userId);
            }
            else
            {
                return _db.Users.Where(u => u.UserCategory.Id == category.Id
                                            &&
                                            u.Weigth > weight - deltaX && u.Weigth < weight + deltaX
                                            &&
                                            u.Height > height - deltaX && u.Height < height + deltaX
                                            &&
                                            u.Id != userId);
            }
        }

        public async Task<bool> IsExistsByEmai(string email)
        {
            return await _db.Users.AnyAsync(u => u.Email == email);
        }
    }
}
