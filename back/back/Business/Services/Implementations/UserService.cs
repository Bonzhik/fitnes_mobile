using Business.Dtos.Auth;
using Business.Dtos.Read;
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
        private readonly IUserCategoryRepository _userCategoryRepository;

        public UserService(IUserRepository userRepository, IUserCategoryRepository userCategoryRepository)
        {
            _userRepository = userRepository;
            _userCategoryRepository = userCategoryRepository;
        }

        public async Task<bool> CreateUserAsync(RegisterDto registerDto)
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

            return await _userRepository.AddAsync(user);
        }

        public async Task<ICollection<UserR>> GetFiltered()
        {
            var users = _userRepository.GetAllAsync();

            List<UserR> filtered = [];

            foreach (var user in users)
            {
                var category = await _userCategoryRepository.GetByUser(user.Id);

                filtered.Add(new UserR
                {
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Height = user.Height,
                    Weigth = user.Weigth,
                    CategoryR = new UserCategoryR
                    {
                        Id = category.Id,
                        CategoryName = category.CategoryName
                    }
                });
            }

            return filtered;
        }

        public async Task<UserR> GetUserByIdAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            var category = await _userCategoryRepository.GetByUser(userId);

            var result = new UserR
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Height = user.Height,
                Weigth = user.Weigth,
                CategoryR = new UserCategoryR
                {
                    Id = category.Id,
                    CategoryName = category.CategoryName
                }
            };

            return result;
        }
    }
}
