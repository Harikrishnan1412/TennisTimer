using System;
using System.Collections.Generic;

namespace TennisTimer.Models
{
    public partial class CourtBooking
    {
        public CourtBooking()
        {
            CourtReviews = new HashSet<CourtReview>();
        }

        public int BookingId { get; set; }
        public int CourtId { get; set; }
        public DateTime BookingDate { get; set; }
        public int? Slot1 { get; set; }
        public int? Slot2 { get; set; }
        public int? Slot3 { get; set; }
        public string UserName { get; set; } = null!;

        public virtual Court? Court { get; set; } = null!;
        public virtual User? UserNameNavigation { get; set; } = null!;
        public virtual ICollection<CourtReview>? CourtReviews { get; set; }
    }
}
