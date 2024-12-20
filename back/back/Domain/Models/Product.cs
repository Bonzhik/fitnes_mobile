namespace Domain.Models
{
    public class Product : BaseEntity
    {
        public string? ImageUrl { get; set; }
        public string Name { get; set; }
        public int Proteins { get; set; }
        public int Fats { get; set; }
        public int Carbohydrates { get; set; }
        public int Kcals { get; set; }
        public virtual ICollection<Day> Days { get; set; }
    }
}
