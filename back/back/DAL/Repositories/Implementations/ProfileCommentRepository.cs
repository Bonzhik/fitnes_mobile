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
    public class ProfileCommentRepository : BaseRepository<ProfileComments>, IProfileCommentRepository
    {
        public ProfileCommentRepository(ApplicationDbContext db) : base(db)
        {
        }

        public IQueryable<ProfileComments> GetByUserId(long userId)
        {
            return _db.ProfileComments.Where(c => c.CommentBy.Id == userId);
        }
    }
}
