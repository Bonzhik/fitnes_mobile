using Business.Dtos.Auth;
using Business.Dtos.Read;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> CreateUserAsync(RegisterDto registerDto);
        Task<UserR> GetUserByIdAsync(long userId);
    }
}
