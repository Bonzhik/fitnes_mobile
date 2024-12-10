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
    public class TrainingRepository : BaseRepository<Training>, ITrainingRepository
    {
        public TrainingRepository(ApplicationDbContext db) : base(db)
        {
        }

        public IQueryable<Training> GetByUserId(long userId)
        {
            return _db.Users.Where(u => u.Id == userId).SelectMany(u => u.Trainings);
        }
    }
}
