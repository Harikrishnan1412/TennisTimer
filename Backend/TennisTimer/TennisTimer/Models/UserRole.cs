using System;
using System.Collections.Generic;

namespace TennisTimer.Models
{
    public partial class UserRole
    {
        public string UserName { get; set; } = null!;
        public int RoleId { get; set; }

        public virtual Role Role { get; set; } = null!;
        public virtual User UserNameNavigation { get; set; } = null!;
    }
}
