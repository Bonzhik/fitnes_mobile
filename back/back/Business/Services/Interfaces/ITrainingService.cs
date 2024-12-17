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
    public interface ITrainingService
    {
        Task<ICollection<TrainingR>> GetByUserIdAsync(long userId);
        Task<ICollection<TrainingR>> GetByDayAsync(long dayId);
        Task<TrainingR> GetByIdAsync(long id);
        Task<bool> CreateTrainingAsync(TrainingW trainingW, long userId);
        Task<ICollection<TrainingR>> GetAllAsync();
    }
}
