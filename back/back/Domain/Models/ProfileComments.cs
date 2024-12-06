namespace Domain.Models
{
    public class ProfileComments : BaseEntity
    {
        public User CommentBy { get; set; }
        public User CommentTo { get; set; }
        public string Text { get; set; }
    }
}
