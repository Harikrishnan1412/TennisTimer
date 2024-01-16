using System;
using System.Collections.Generic;

namespace TennisTimer.Models
{
    public partial class User
    {
        public User()
        {
            CourtBookings = new HashSet<CourtBooking>();
            CourtReviews = new HashSet<CourtReview>();
        }

        public string UserName { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = null!;
        public byte[] PasswordSalt { get; set; } = null!;

        public virtual UserRole? UserRole { get; set; }
        public virtual ICollection<CourtBooking> CourtBookings { get; set; }
        public virtual ICollection<CourtReview> CourtReviews { get; set; }
    }
}
