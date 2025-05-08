using Common.Services;
using DAL.Context;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Helpers
{
    public static class DBSeed
    {
        public static void Seed(ApplicationDbContext context)
        {
            var now = DateTime.UtcNow;
            var random = new Random();

            if (!context.UserCategories.Any())
            {
                var categories = new List<UserCategory>
                    {
                        new UserCategory { CategoryName = "Новичок", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                        new UserCategory { CategoryName = "Продвинутый", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
                        new UserCategory { CategoryName = "Мастер", CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
                    };

                context.UserCategories.AddRange(categories);
                context.SaveChanges();
            }

            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product { Name = "Яблоко", Proteins = 0, Fats = 0, Carbohydrates = 14, Kcals = 52 },
                    new Product { Name = "Куриная грудка", Proteins = 31, Fats = 3, Carbohydrates = 0, Kcals = 165 },
                    new Product { Name = "Овсянка", Proteins = 12, Fats = 7, Carbohydrates = 60, Kcals = 370 },
                    new Product { Name = "Миндаль", Proteins = 21, Fats = 49, Carbohydrates = 22, Kcals = 579 },
                    new Product { Name = "Творог", Proteins = 18, Fats = 9, Carbohydrates = 3, Kcals = 150 },
                    new Product { Name = "Банан", Proteins = 1, Fats = 0, Carbohydrates = 23, Kcals = 96 },
                    new Product { Name = "Гречка", Proteins = 13, Fats = 3, Carbohydrates = 72, Kcals = 343 },
                    new Product { Name = "Яйцо куриное", Proteins = 13, Fats = 11, Carbohydrates = 1, Kcals = 155 },
                    new Product { Name = "Брокколи", Proteins = 3, Fats = 0, Carbohydrates = 7, Kcals = 34 },
                    new Product { Name = "Лосось", Proteins = 20, Fats = 13, Carbohydrates = 0, Kcals = 208 }
                };

                foreach (var product in products)
                {
                    product.CreatedAt = now;
                    product.UpdatedAt = now;
                }

                context.Products.AddRange(products);
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                var categories = context.UserCategories.ToList();
                var users = new List<User>();

                for (int i = 1; i <= 20; i++)
                {
                    var gender = (Gender)random.Next(0, 2);
                    var firstName = gender == Gender.MALE ? $"Иван{i}" : $"Анна{i}";
                    var lastName = $"Тестов{i}";
                    var email = $"user{i}@example.com";

                    users.Add(new User
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        Email = email,
                        PasswordHash = "123456",
                        Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        Height = (float)(random.NextDouble() * 50 + 150),
                        Weigth = (float)(random.NextDouble() * 40 + 50),
                        Gender = gender,
                        UserCategory = categories[random.Next(categories.Count)],
                        CreatedAt = now,
                        UpdatedAt = now
                    });
                }

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            if (!context.Exercises.Any())
            {
                var users = context.Users.ToList();
                var exercises = new List<Exercise>();

                for (int i = 1; i <= 10; i++)
                {
                    exercises.Add(new Exercise
                    {
                        Name = $"Упражнение {i}",
                        Description = $"Описание упражнения {i} Описание упражнения {i} Описание упражнения {i} Описание упражнения {i} Описание упражнения {i}",
                        CreatedBy = users[random.Next(users.Count)],
                        CreatedAt = now,
                        UpdatedAt = now
                    });
                }

                context.Exercises.AddRange(exercises);
                context.SaveChanges();
            }

            if (!context.TrainingCategories.Any())
            {
                var categories = new List<TrainingCategory>
                {
                    new TrainingCategory { CategoryName = "Сила", CreatedAt = now, UpdatedAt = now },
                    new TrainingCategory { CategoryName = "Выносливость", CreatedAt = now, UpdatedAt = now },
                    new TrainingCategory { CategoryName = "Гибкость", CreatedAt = now, UpdatedAt = now }
                };

                context.TrainingCategories.AddRange(categories);
                context.SaveChanges();
            }

            if (!context.Trainings.Any())
            {
                var users = context.Users.ToList();
                var exercises = context.Exercises.ToList();
                var categories = context.TrainingCategories.ToList();

                var trainings = new List<Training>();

                for (int i = 1; i <= 10; i++)
                {
                    var training = new Training
                    {
                        Name = $"Тренировка {i}",
                        Description = $"Описание тренировки {i} Описание тренировки {i} Описание тренировки {i} Описание тренировки {i} Описание тренировки {i}",
                        CreatedBy = users[random.Next(users.Count)],
                        TrainingCategory = categories[random.Next(categories.Count)],
                        CreatedAt = now,
                        UpdatedAt = now
                    };

                    var count = random.Next(1, 4);
                    training.Exercises = exercises.OrderBy(_ => random.Next()).Take(count).ToList();

                    trainings.Add(training);
                }

                context.Trainings.AddRange(trainings);
                context.SaveChanges();
            }

            SeedDays(context);
            SeedComments(context);
        }

        public static void SeedDays(ApplicationDbContext context)
        {
            var now = DateTime.UtcNow;
            var random = new Random();

            if (!context.Days.Any())
            {
                var products = context.Products.ToList();
                var trainings = context.Trainings.ToList();

                var usersToUpdate = context.Users
                    .Include(u => u.Planner)
                    .ThenInclude(p => p.Days)
                    .Where(u => u.Planner == null || !u.Planner.Days.Any())
                    .ToList();

                foreach (var user in usersToUpdate)
                {
                    var planner = new Planner
                    {
                        CreatedAt = now,
                        UpdatedAt = now,
                        Days = new List<Day>()
                    };

                    for (int i = 0; i < 3; i++) // 3 дня: сегодня и два предыдущих
                    {
                        var dayDate = DateTime.UtcNow.Date.AddDays(-i);
                        var day = new Day
                        {
                            DayDate = dayDate,
                            CreatedAt = now,
                            UpdatedAt = now,
                            Trainings = trainings.OrderBy(_ => random.Next()).Take(random.Next(1, 3)).ToList(),
                            ProductItems = new List<ProductItem>()
                        };

                        // Добавим 1-3 продукта в день
                        var dayProducts = products.OrderBy(_ => random.Next()).Take(random.Next(1, 4));
                        foreach (var product in dayProducts)
                        {
                            day.ProductItems.Add(new ProductItem
                            {
                                Product = product,
                                Count = random.Next(50, 301), // от 50 до 300 г
                                CreatedAt = now,
                                UpdatedAt = now
                            });
                        }

                        planner.Days.Add(day);
                    }

                    user.Planner = planner;
                    user.UpdatedAt = now;
                }

                context.SaveChanges();
            }
        }

        public static void SeedComments(ApplicationDbContext context)
        {
            var now = DateTime.UtcNow;
            var random = new Random();

            var users = context.Users.ToList();
            var trainings = context.Trainings
                .Include(t => t.CreatedBy)
                .Include(t => t.Comments)
                .ToList();

            // Добавим комментарии к тренировкам
            if (!context.TrainingComments.Any())
            {
                var trainingComments = new List<TrainingComments>();

                foreach (var user in users)
                {
                    var trainingToComment = trainings
                        .Where(t => t.CreatedBy.Id != user.Id &&
                                    !t.Comments.Any(c => c.CommentBy.Id == user.Id))
                        .OrderBy(_ => random.Next())
                        .FirstOrDefault();

                    if (trainingToComment != null)
                    {
                        var rating = random.Next(3, 6); // Оценки от 3 до 5

                        var comment = new TrainingComments
                        {
                            CommentBy = user,
                            CommentTo = trainingToComment,
                            Text = $"Комментарий к {trainingToComment.Name}",
                            Rating = rating,
                            CreatedAt = now,
                            UpdatedAt = now
                        };

                        trainingComments.Add(comment);
                    }
                }

                context.TrainingComments.AddRange(trainingComments);
                context.SaveChanges();

                var updatedTrainings = context.Trainings
                    .Include(t => t.Comments)
                    .ToList();

                // Обновим рейтинг тренировок
                foreach (var training in trainings)
                {
                    training.Rating = RatingService.CalculateRating(training.Comments);
                }

                context.SaveChanges();
            }

            // Добавим комментарии к профилям
            if (!context.ProfileComments.Any())
            {
                var profileComments = new List<ProfileComments>();

                foreach (var user in users)
                {
                    var target = users
                        .Where(u => u.Id != user.Id &&
                                    !u.ThisProfileComments.Any(c => c.CommentBy.Id == user.Id))
                        .OrderBy(_ => random.Next())
                        .FirstOrDefault();

                    if (target != null)
                    {
                        var rating = random.Next(3, 6);

                        var comment = new ProfileComments
                        {
                            CommentBy = user,
                            CommentTo = target,
                            Text = $"Комментарий к профилю {target.FirstName} :-) Комментарий к профилю {target.FirstName} :-)",
                            Rating = rating,
                            CreatedAt = now,
                            UpdatedAt = now
                        };

                        profileComments.Add(comment);
                    }
                }

                context.ProfileComments.AddRange(profileComments);
                context.SaveChanges();

                var updatedUsers = context.Users
                    .Include(u => u.ThisProfileComments)
                    .ToList();

                // Обновим рейтинг пользователей
                foreach (var user in users)
                {
                    user.Rating = RatingService.CalculateRating(user.ThisProfileComments);
                }

                context.SaveChanges();
            }
        }
    }
}
