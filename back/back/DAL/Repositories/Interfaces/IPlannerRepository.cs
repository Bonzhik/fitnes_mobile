using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IPlannerRepository : IBaseRepository<Planner>
    {
        Task<Planner> GetPlannerByUserIdAsync(long userId);
    }
}
