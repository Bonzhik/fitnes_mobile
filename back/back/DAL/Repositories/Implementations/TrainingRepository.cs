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

        public IQueryable<Training> GetByDayId(long dayId)
        {
            return _db.Days.Where(d => d.Id == dayId).SelectMany(d => d.Trainings);
        }

        public IQueryable<Training> GetByName(string name)
        {
            return _db.Trainings.Where(t => t.Name.Contains(name));
        }

        public IQueryable<Training> GetByUserId(long userId)
        {
            return _db.Users.Where(u => u.Id == userId).SelectMany(u => u.Trainings);
        }
    }
}
