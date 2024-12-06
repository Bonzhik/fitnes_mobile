using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Write
{
    public class ProfileCommentW
    {
        public string Text { get; set; }
        public long CommentTo { get; set; }
    }
}
