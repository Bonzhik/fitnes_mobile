namespace Domain.Models
{
    public class UserCategory : BaseEntity
    {
        public string CategoryName { get; set; }
        public virtual ICollection<User> Users { get; set; } = [];
    }
}
