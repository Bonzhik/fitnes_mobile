namespace Domain.Models
{
    public class User : BaseEntity
    {
        public string? ImageUrl { get; set; }    
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public float Height { get; set; }
        public float Weigth { get; set; }
        public Gender Gender { get; set; }
        public float? Rating { get; set; }
        public virtual UserCategory? UserCategory { get; set; }
        public virtual Planner Planner { get; set; } = new Planner();
        public virtual ICollection<Training> CreatedTrainings { get; set; } = [];
        public virtual ICollection<Exercise> CreatedExercises { get; set; } = [];
        public virtual ICollection<Training> Trainings { get; set; } = [];
        public virtual ICollection<ProfileComments> ThisProfileComments { get; set; } = [];
        public virtual ICollection<ProfileComments> ProfileComments { get; set; } = [];
        public virtual ICollection<TrainingComments> TrainingComments { get; set; } = [];
        public virtual ICollection<Feedback> Feedbacks { get; set; } = [];
        public string? RefreshToken { get; set; }
    }

    public enum Gender
    {
        MALE,
        FEMALE
    }
}
