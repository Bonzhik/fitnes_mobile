namespace Domain.Models
{
    public class Planner : BaseEntity
    {
        public virtual User User { get; set; }
        public virtual ICollection<Day> Days { get; set; }
    }
}
