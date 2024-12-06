namespace Domain.Models
{
    public class Day : BaseEntity
    {
        public Planner Planner { get; set; }
        public ICollection<Product> Products { get; set; } = [];
        public ICollection<Training> Trainings { get; set; } = [];
    }
}
