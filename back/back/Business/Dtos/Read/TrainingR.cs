﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Read
{
    public class TrainingR
    {
        public long Id { get; set; }
        public UserR CreatedBy { get; set; }
    }
}
