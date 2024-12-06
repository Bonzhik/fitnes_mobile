namespace Domain.Models
{
    public class UserCategory : BaseEntity
    {
        public string CategoryName { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
