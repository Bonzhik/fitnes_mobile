using Business.Dtos.Read;
using Business.Dtos.Write;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Interfaces
{
    public interface IDayService
    {
        Task<ICollection<DayR>> GetByPlannerIdAsync(long userId);
        Task<bool> CreateDayAsync(DayW dayW, long userId);   
    }
}
