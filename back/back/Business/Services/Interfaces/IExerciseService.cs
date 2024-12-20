using Business.Dtos.Read;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Interfaces
{
    public interface IExerciseService
    {
        Task<ICollection<ExerciseR>> GetByTrainingIdAsync(long trainingId);
        Task<ExerciseR> GetByIdAsync(long id);
        Task<ICollection<ExerciseR>> GetByName(string name);
        Task<ICollection<ExerciseR>> GetAll();
    }
}
