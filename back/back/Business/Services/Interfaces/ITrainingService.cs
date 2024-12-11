using Business.Dtos.Read;
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
        Task<TrainingR> GetByIdAsync(long id);
    }
}
