﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByRefreshTokenAsync(string refreshToken);
        IQueryable<User> GetFiltered(float deltaX, float weight, float height, UserCategory? category, long userId);
        Task<bool> IsExistsByEmai(string email);
    }
}
