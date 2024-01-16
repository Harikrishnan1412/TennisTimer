using System;
using System.Collections.Generic;

namespace TennisTimer.Models
{
    public partial class TblRefreshToken
    {
        public string UserName { get; set; } = null!;
        public int? TokenId { get; set; }
        public string? RefreshToken { get; set; }
        public bool? IsActive { get; set; }
    }
}
