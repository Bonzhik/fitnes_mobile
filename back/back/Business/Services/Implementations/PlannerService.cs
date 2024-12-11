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
    public class PlannerService : IPlannerService
    {
        private readonly IPlannerRepository _plannerRepository;

        public PlannerService(IPlannerRepository plannerRepository)
        {
            _plannerRepository = plannerRepository;
        }

        public async Task<PlannerR> GetByUserIdAsync(long userId)
        {
            var planner = await _plannerRepository.GetPlannerByUserIdAsync(userId);

            var plannerDto = new PlannerR
            {
                Id = planner.Id,
            };

            return plannerDto;
        }
    }
}
