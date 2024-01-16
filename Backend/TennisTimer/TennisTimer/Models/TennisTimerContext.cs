using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TennisTimer.Models
{
    public partial class TennisTimerContext : DbContext
    {
        public TennisTimerContext()
        {
        }

        public TennisTimerContext(DbContextOptions<TennisTimerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Court> Courts { get; set; } = null!;
        public virtual DbSet<CourtBooking> CourtBookings { get; set; } = null!;
        public virtual DbSet<CourtReview> CourtReviews { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<TblRefreshToken> TblRefreshTokens { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserRole> UserRoles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("Data Source=LAPTOP-JPTV1H8P\\SQLEXPRESS01;Initial Catalog=TennisTimer;Integrated Security=True;");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Court>(entity =>
            {
                entity.ToTable("Court");

                entity.Property(e => e.CourtLocation)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CourtName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CourtBooking>(entity =>
            {
                entity.HasKey(e => e.BookingId)
                    .HasName("PK__CourtBoo__73951ACDBEAA2101");

                entity.ToTable("CourtBooking");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.BookingDate).HasColumnType("datetime");

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Court)
                    .WithMany(p => p.CourtBookings)
                    .HasForeignKey(d => d.CourtId)
                    .HasConstraintName("FK__CourtBook__UserN__534D60F1");

                entity.HasOne(d => d.UserNameNavigation)
                    .WithMany(p => p.CourtBookings)
                    .HasForeignKey(d => d.UserName)
                    .HasConstraintName("FK__CourtBook__UserN__5441852A");
            });

            modelBuilder.Entity<CourtReview>(entity =>
            {
                entity.HasKey(e => e.ReviewId)
                    .HasName("PK__CourtRev__74BC79CE663A9DF3");

                entity.ToTable("CourtReview");

                entity.Property(e => e.BookingId).HasColumnName("BookingID");

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.CourtReviews)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CourtRevi__Booki__59063A47");

                entity.HasOne(d => d.Court)
                    .WithMany(p => p.CourtReviews)
                    .HasForeignKey(d => d.CourtId)
                    .HasConstraintName("FK__CourtRevi__Ratin__571DF1D5");

                entity.HasOne(d => d.UserNameNavigation)
                    .WithMany(p => p.CourtReviews)
                    .HasForeignKey(d => d.UserName)
                    .HasConstraintName("FK__CourtRevi__UserN__5812160E");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).ValueGeneratedNever();

                entity.Property(e => e.RoleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblRefreshToken>(entity =>
            {
                entity.HasKey(e => e.UserName)
                    .HasName("PK__Tbl_Refr__C9F2845720CBE90B");

                entity.ToTable("Tbl_RefreshToken");

                entity.Property(e => e.UserName).HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserName)
                    .HasName("PK__Users__C9F284570F7F8C02");

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => e.UserName)
                    .HasName("PK__UserRole__C9F284579A941BFF");

                entity.ToTable("UserRole");

                entity.Property(e => e.UserName)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__UserRole__RoleId__4E88ABD4");

                entity.HasOne(d => d.UserNameNavigation)
                    .WithOne(p => p.UserRole)
                    .HasForeignKey<UserRole>(d => d.UserName)
                    .HasConstraintName("FK__UserRole__UserNa__4D94879B");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
