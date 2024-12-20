using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ITrainingCommentRepositry : IBaseRepository<TrainingComments>
    {
        IQueryable<TrainingComments> GetByTrainingId(long trainingId);
        Task<bool> IsExistsByUser(long commentTo, long commentBy);
    }
}
