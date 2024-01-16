namespace TennisTimer.Models
{
    public class Courttofront
    {
        public int CourtId { get; set; }
        public string CourtName { get; set; } = null!;
        public string CourtLocation { get; set; } = null!;
        public string? CourtImg1 { get; set; }
        public string? CourtImg2 { get; set; }
        public string? CourtImg3 { get; set; }
    }
}
