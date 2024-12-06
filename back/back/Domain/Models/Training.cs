namespace Domain.Models
{
    public class Training : BaseEntity
    {
        public User CreatedBy { get; set; }
        public ICollection<User> Users { get; set; } = [];
        public ICollection<TrainingComments> Comments { get; set; } = [];
        public TrainingCategory TrainingCategory { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = [];
        public ICollection<Day> Days { get; set; } = [];
    }
}
