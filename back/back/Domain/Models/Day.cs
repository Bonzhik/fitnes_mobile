﻿namespace Domain.Models
{
    public class Day : BaseEntity
    {
        public DateTime DayDate { get; set; }
        public virtual Planner Planner { get; set; }
        public virtual ICollection<Product> Products { get; set; } = [];
        public virtual ICollection<Training> Trainings { get; set; } = [];
    }
}
