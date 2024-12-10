using DAL.Context;
using DAL.Repositories.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class ExerciseRepository : BaseRepository<Exercise>, IExerciseRepository
    {
        public ExerciseRepository(ApplicationDbContext db) : base(db)
        {
        }

        public IQueryable<Exercise> GetByTrainingId(long trainingId)
        {
            return _db.Trainings.Where(t => t.Id == trainingId).SelectMany(e => e.Exercises);
        }
    }
}
