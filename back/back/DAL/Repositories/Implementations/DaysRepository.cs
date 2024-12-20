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
    public class DaysRepository : BaseRepository<Day>, IDaysRepository
    {
        public DaysRepository(ApplicationDbContext db) : base(db)
        {
        }

        public IQueryable<Day> GetByPlannerId(long plannerId)
        {
            return _db.Days.Where(d => d.Planner.Id == plannerId);
        }

        public async Task<bool> IsExistsByDay(DateTime date, long userId)
        {
            return await _db.Days.Where(d => d.Planner.User.Id == userId).AnyAsync(d => d.DayDate.Date == date.Date);
        }
    }
}
