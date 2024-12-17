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
using static System.Net.Mime.MediaTypeNames;

namespace Business.Services.Implementations
{
    public class TrainingService : ITrainingService
    {
        private readonly ITrainingRepository _trainingRepository;
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;
        private readonly IExerciseRepository _exerciseRepository;
        private readonly ITrainingCategoryRepository _trainingCategoryRepository;

        public TrainingService(ITrainingRepository trainingRepository, IUserService userService, IUserRepository userRepository, IExerciseRepository exerciseRepository, ITrainingCategoryRepository trainingCategoryRepository)
        {
            _trainingRepository = trainingRepository;
            _userService = userService;
            _userRepository = userRepository;
            _exerciseRepository = exerciseRepository;
            _trainingCategoryRepository = trainingCategoryRepository;
        }

        public async Task<bool> CreateTrainingAsync(TrainingW trainingW, long userId)
        {
            List<Exercise> exercises = [];

            foreach(var exercise in trainingW.ExerciseIds)
            {
                exercises.Add(await _exerciseRepository.GetByIdAsync(exercise));  
            }

            var training = new Training
            {
                CreatedBy = await _userRepository.GetByIdAsync(userId),
                Exercises = exercises,
                TrainingCategory = await _trainingCategoryRepository.GetByIdAsync(trainingW.CategoryId)
            };

            return await _trainingRepository.AddAsync(training);
        }

        public async Task<ICollection<TrainingR>> GetByDayAsync(long dayId)
        {
            var test = _trainingRepository.GetByDayId(dayId);
            var trainings = test.ToList();

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
            var test = _trainingRepository.GetByUserId(userId);
            var trainings = test.ToList();

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

        public async Task<ICollection<TrainingR>> GetAllAsync()
        {
            var test = _trainingRepository.GetAllAsync();
            var trainings = test.ToList();

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
