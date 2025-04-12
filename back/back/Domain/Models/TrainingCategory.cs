namespace Domain.Models
{
    public class TrainingCategory : BaseEntity
    {
        public string CategoryName { get; set; }
        public virtual ICollection<Training> Trainings { get; set; } = [];
    }
}
