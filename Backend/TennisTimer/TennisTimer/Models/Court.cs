using System;
using System.Collections.Generic;

namespace TennisTimer.Models
{
    public partial class Court
    {
        public Court()
        {
            CourtBookings = new HashSet<CourtBooking>();
            CourtReviews = new HashSet<CourtReview>();
        }

        public int CourtId { get; set; }
        public string CourtName { get; set; } = null!;
        public string CourtLocation { get; set; } = null!;
        public byte[]? CourtImg1 { get; set; }
        public byte[]? CourtImg2 { get; set; }
        public byte[]? CourtImg3 { get; set; }

        public virtual ICollection<CourtBooking>? CourtBookings { get; set; }
        public virtual ICollection<CourtReview>? CourtReviews { get; set; }
    }
}
