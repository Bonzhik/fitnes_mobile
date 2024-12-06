namespace Domain.Models
{
    public class Exercise : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public User CreatedBy { get; set; }
        public ICollection<Training> Trainings { get; set; }
    }
}
