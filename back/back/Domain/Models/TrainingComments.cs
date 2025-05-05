namespace Domain.Models
{
    public class TrainingComments : BaseEntity, ICommentWithRating
    {
        public virtual User CommentBy { get; set; }
        public virtual Training CommentTo { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
    }
}
