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
    public class PlannerRepository : BaseRepository<Planner>, IPlannerRepository
    {
        public PlannerRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<Planner> GetPlannerByUserIdAsync(long userId)
        {
            return await _db.Planners.SingleOrDefaultAsync(x => x.User.Id == userId);
        }
    }
}
