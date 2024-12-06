using Business.Dtos.Auth;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<bool> CreateUserAsync(RegisterDto registerDto)
        {
            var user = new User()
            {
                Email = registerDto.Email,
                PasswordHash = registerDto.Password, 
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Height = registerDto.Height,
                Weigth = registerDto.Weigth
            };

            return _userRepository.AddAsync(user);
        }
    }
}
