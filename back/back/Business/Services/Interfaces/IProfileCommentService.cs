using Business.Dtos.Read;
using Business.Dtos.Write;
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
        Task<bool> CreateCommentAsync(ProfileCommentW profileCommentW, long userId);
        Task<float> CalculateRating(long profileCommentId);
    }
}
