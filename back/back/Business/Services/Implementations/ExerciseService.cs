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
    public class ExerciseService : IExerciseService
    {
        private readonly IExerciseRepository _exerciseRepository;
        public ExerciseService(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }
        public async Task<ExerciseR> GetByIdAsync(long id)
        {
            var exercise = await _exerciseRepository.GetByIdAsync(id);

            var exerciseDto = new ExerciseR
            {
                Id = exercise.Id,
                Name = exercise.Name,
                Description = exercise.Description,
            };

            return exerciseDto;
        }

        public async Task<ICollection<ExerciseR>> GetByTrainingIdAsync(long trainingId)
        {
            var exercises = _exerciseRepository.GetByTrainingId(trainingId);

            List<ExerciseR> exercisesDtos = [];

            foreach (var exercise in exercises)
            {
                exercisesDtos.Add(new ExerciseR
                {
                    Id = exercise.Id,
                    Name = exercise.Name,
                    Description = exercise.Description,
                });
            }

            return exercisesDtos;
        }
    }
}
