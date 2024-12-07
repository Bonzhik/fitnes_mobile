using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IUserCategoryRepository : IBaseRepository<UserCategory>
    {
        Task<UserCategory> GetByUser(long userId);
    }
}
