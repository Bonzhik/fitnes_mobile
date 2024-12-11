using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Implementations
{
    public class DayService : IDayService
    {
        private readonly IDaysRepository _daysRepository;
        public DayService(IDaysRepository daysRepository)
        {
            _daysRepository = daysRepository;
        }
        public async Task<ICollection<DayR>> GetByPlannerIdAsync(long plannerId)
        {
            var days = _daysRepository.GetByPlannerId(plannerId);

            List<DayR> daysDto = [];

            foreach (var day in days)
            {
                daysDto.Add(new DayR { Id = day.Id , DayDate = day.DayDate } );
            }

            return daysDto;
        }
    }
}
