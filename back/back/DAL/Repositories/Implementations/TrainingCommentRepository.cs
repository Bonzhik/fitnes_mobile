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
    public class TrainingCommentRepository : BaseRepository<TrainingComments>, ITrainingCommentRepositry
    {
        public TrainingCommentRepository(ApplicationDbContext db) : base(db)
        {
        }

        public IQueryable<TrainingComments> GetByTrainingId(long trainingId)
        {
            return _db.TrainingComments.Where(tc => tc.CommentTo.Id == trainingId);
        }
    }
}
