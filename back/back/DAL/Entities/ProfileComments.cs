﻿using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class ProfileComments : BaseEntity
    {
        public User CommentBy {  get; set; }
        public User CommentTo { get; set; }
        public string Text { get; set; }
    }
}
