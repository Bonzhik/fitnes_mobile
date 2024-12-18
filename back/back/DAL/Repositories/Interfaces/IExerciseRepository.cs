using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IExerciseRepository : IBaseRepository<Exercise>
    {
        IQueryable<Exercise> GetByTrainingId(long trainingId);
        IQueryable<Exercise> GeyByName(string name);
    }
}
