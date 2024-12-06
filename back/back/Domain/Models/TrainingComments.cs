namespace Domain.Models
{
    public class TrainingComments : BaseEntity
    {
        public User CommentBy { get; set; }
        public Training CommentTo { get; set; }
        public string Text { get; set; }
    }
}
