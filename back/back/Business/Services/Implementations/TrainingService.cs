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
    public class TrainingService : ITrainingService
    {
        private readonly ITrainingRepository _trainingRepository;
        private readonly IUserService _userService;

        public TrainingService(ITrainingRepository trainingRepository, IUserService userService)
        {
            _trainingRepository = trainingRepository;
            _userService = userService;
        }

        public async Task<TrainingR> GetByIdAsync(long id)
        {
            var training = await _trainingRepository.GetByIdAsync(id);

            var trainingDto = new TrainingR
            {
                Id = training.Id,
                CreatedBy = await _userService.GetUserByIdAsync(training.CreatedBy.Id), //Optimize
            };

            return trainingDto;
        }

        public async Task<ICollection<TrainingR>> GetByUserIdAsync(long userId)
        {
            var trainings = _trainingRepository.GetByUserId(userId);

            List<TrainingR> trainingsDto = [];

            foreach (var training in trainings)
            {
                trainingsDto.Add(new TrainingR
                {
                    Id = training.Id,
                    CreatedBy = await _userService.GetUserByIdAsync(training.CreatedBy.Id), //Optimize
                });
            }

            return trainingsDto;
        }
    }
}
