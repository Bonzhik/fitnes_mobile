using DAL.Context;
using DAL.Repositories.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class TrainingCategoryRepository : BaseRepository<TrainingCategory>, ITrainingCategoryRepository
    {
        public TrainingCategoryRepository(ApplicationDbContext db) : base(db)
        {
        }

        public async Task<TrainingCategory> GetByTrainingIdAsync(long trainingId)
        {
            return await _db.TrainingCategories
                            .Where(tc => tc.Trainings.Any(t => t.Id == trainingId))
                            .SingleOrDefaultAsync();
        }
    }
}
