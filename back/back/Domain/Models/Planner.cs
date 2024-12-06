namespace Domain.Models
{
    public class Planner : BaseEntity
    {
        public User User { get; set; }
        public ICollection<Day> Days { get; set; }
    }
}
