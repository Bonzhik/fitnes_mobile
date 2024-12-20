using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IDaysRepository : IBaseRepository<Day>
    {
        IQueryable<Day> GetByPlannerId(long plannerId);
        Task<bool> IsExistsByDay(DateTime date, long userId);
    }
}
