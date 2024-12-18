using Business.Dtos.Auth;
using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public async Task<ICollection<UserR>> GetFiltered(long userId)
        {
            const int GOAL_COUNT = 10;
            var DELTA_X = 5f;

            var result = new List<User>();

            var currentUser = await _userRepository.GetByIdAsync(userId);

            while (result.Count < GOAL_COUNT && DELTA_X < 20f)
            {
                DELTA_X += 5f;
                var currentUsers = _userRepository.GetFiltered(DELTA_X, currentUser.Weigth, currentUser.Height, DELTA_X >= 10 ? null : currentUser.UserCategory, userId).ToList();

                foreach(var user in currentUsers)
                {
                    if (!result.Any(u => u.Id == user.Id))
                    {
                        result.Add(user);
                    }
                }
            }

            var filtered = new List<UserR>();   

            foreach (var user in result)
            {
                filtered.Add(new UserR
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Height = user.Height,
                    Weigth = user.Weigth,
                    CategoryR = new UserCategoryR
                    {
                        Id = user.UserCategory.Id,
                        CategoryName = user.UserCategory.CategoryName
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
                Id = user.Id,
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
