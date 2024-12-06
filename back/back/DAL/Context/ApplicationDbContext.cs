using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Day> Days { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Planner> Planners { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProfileComments> ProfileComments { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<TrainingCategory> TrainingCategories { get; set; }
        public DbSet<TrainingComments> TrainingComments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserCategory> UserCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProfileComments>()
                .HasOne(pc => pc.CommentBy)
                .WithMany(u => u.ProfileComments)
                .HasForeignKey("CommentById")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ProfileComments>()
                .HasOne(pc => pc.CommentTo)
                .WithMany(u => u.ThisProfileComments)
                .HasForeignKey("CommentToId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Exercise>()
                .HasOne(e => e.CreatedBy)
                .WithMany(u => u.CreatedExercises)
                .HasForeignKey("CreatedById")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Training>()
                .HasOne(t => t.CreatedBy)
                .WithMany(u => u.CreatedTrainings)
                .HasForeignKey("CreatedById")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Planner)
                .WithOne(p => p.User)
                .HasForeignKey<User>("PlannerId");
        }
    }
}
