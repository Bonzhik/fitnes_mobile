namespace Domain.Models
{
    public class ProfileComments : BaseEntity
    {
        public virtual User CommentBy { get; set; }
        public virtual User CommentTo { get; set; }
        public string Text { get; set; }
        public float? Rating { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; } = [];
    }
}
