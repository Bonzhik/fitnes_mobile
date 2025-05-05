namespace Domain.Models
{
    public class ProfileComments : BaseEntity, ICommentWithRating
    {
        public virtual User CommentBy { get; set; }
        public virtual User CommentTo { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
    }
}
