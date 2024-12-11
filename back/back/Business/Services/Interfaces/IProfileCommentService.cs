using Business.Dtos.Read;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Interfaces
{
    public interface IProfileCommentService
    {
        Task<ICollection<ProfileCommentR>> GetByUserIdAsync(long userId);
    }
}
