using Business.Dtos.Read;
using Business.Dtos.Write;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Models;
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
        private readonly IPlannerRepository _plannerRepository;
        private readonly ITrainingRepository _trainingRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;

        public DayService(IDaysRepository daysRepository, IPlannerRepository plannerRepository, ITrainingRepository trainingRepository, IProductRepository productRepository, IUserRepository userRepository)
        {
            _daysRepository = daysRepository;
            _plannerRepository = plannerRepository;
            _trainingRepository = trainingRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }

        public async Task<bool> CreateDayAsync(DayW dayW, long userId)
        {
            if (await _daysRepository.IsExistsByDay(dayW.DayDate, userId))
            {
                return false;
            }

            List<Training> trainings = new();
            List<ProductItem> productItems = new();

            foreach (var trainingId in dayW.TrainingIds)
            {
                var training = await _trainingRepository.GetByIdAsync(trainingId);
                if (training != null)
                {
                    trainings.Add(training);
                }
            }

            int rows = dayW.ProductIds.GetLength(0);
            for (int i = 0; i < rows; i++)
            {
                long productId = dayW.ProductIds[i][0];
                long count = dayW.ProductIds[i][1];

                var product = await _productRepository.GetByIdAsync(productId);
                if (product != null)
                {
                    productItems.Add(new ProductItem
                    {
                        Product = product,
                        Count = count
                    });
                }
            }

            var day = new Day
            {
                DayDate = dayW.DayDate,
                Planner = await _plannerRepository.GetPlannerByUserIdAsync(userId),
                Trainings = trainings,
                ProductItems = productItems
            };

            return await _daysRepository.AddAsync(day);
        }

        public async Task<ICollection<DayR>> GetByPlannerIdAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            var days = _daysRepository.GetByPlannerId(user.Planner.Id);

            List<DayR> daysDto = [];

            foreach (var day in days)
            {
                daysDto.Add(new DayR { Id = day.Id , DayDate = day.DayDate } );
            }

            return daysDto;
        }
    }
}
