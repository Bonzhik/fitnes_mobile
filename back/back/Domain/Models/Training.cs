namespace Domain.Models
{
    public class Training : BaseEntity
    {
        public virtual User CreatedBy { get; set; }
        public virtual ICollection<User> Users { get; set; } = [];
        public virtual ICollection<TrainingComments> Comments { get; set; } = [];
        public virtual TrainingCategory TrainingCategory { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; } = [];
        public virtual ICollection<Day> Days { get; set; } = [];
    }
}
