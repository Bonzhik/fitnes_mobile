namespace Domain.Models
{
    public class TrainingComments : BaseEntity
    {
        public virtual User CommentBy { get; set; }
        public virtual Training CommentTo { get; set; }
        public string Text { get; set; }
        public float? Rating { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; } = [];
    }
}
