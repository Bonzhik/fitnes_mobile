namespace Domain.Models
{
    public class Exercise : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual User CreatedBy { get; set; }
        public virtual ICollection<Training> Trainings { get; set; } = [];
    }
}
