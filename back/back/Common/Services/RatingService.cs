using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Services
{
    public static class RatingService
    {
        public static float CalculateRating<TComment>(IEnumerable<TComment> comments)
            where TComment : ICommentWithRating
        {
            var ratedComments = comments
                .Select(c => c.Rating)
                .ToList();

            if (!ratedComments.Any())
                return 0f;

            return (float) ratedComments.Average();
        }
    }
}
