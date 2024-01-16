using System;
using System.Collections.Generic;

namespace TennisTimer.Models
{
    public partial class CourtReview
    {
        public int ReviewId { get; set; }
        public int CourtId { get; set; }
        public string UserName { get; set; } = null!;
        public int BookingId { get; set; }
        public int? Rating { get; set; }

        public virtual CourtBooking? Booking { get; set; } = null!;
        public virtual Court? Court { get; set; } = null!;
        public virtual User? UserNameNavigation { get; set; } = null!;
    }
}
