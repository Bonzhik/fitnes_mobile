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
    public class UserCategoryRepository : BaseRepository<UserCategory>, IUserCategoryRepository
    {
        public UserCategoryRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<UserCategory> GetByUser(long userId)
        {
            return await _db.UserCategories.SingleOrDefaultAsync(u => u.Users.Any(u => u.Id == userId));
        }
    }
}
