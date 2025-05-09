﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface ITrainingRepository : IBaseRepository<Training>
    {
        IQueryable<Training> GetByUserId(long userId);
        IQueryable<Training> GetByDayId(long dayId);
        IQueryable<Training> GetByName(string name);

    }
}
