﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IProfileCommentRepository : IBaseRepository<ProfileComments>
    {
        IQueryable<ProfileComments> GetByUserId(long userId);
        Task<bool> IsExistsByUser(long commentTo, long commentBy);
    }
}
