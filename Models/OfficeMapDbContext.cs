using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OfficeMap.Models
{
    public partial class OfficeMapDbContext : DbContext
    {
        public OfficeMapDbContext()
        {
        }

        public OfficeMapDbContext(DbContextOptions<OfficeMapDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Desk> Desks { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Photo> Photos { get; set; }
        public virtual DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Desk>(entity =>
            {
                entity.ToTable("desk");

                entity.HasIndex(e => new {e.FloorNumber, e.XCoordinate, e.YCoordinate})
                    .HasName("desk_floor_number_x_coordinate_y_coordinate_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("desk_id");

                entity.Property(e => e.FloorNumber).HasColumnName("floor_number");

                entity.Property(e => e.XCoordinate).HasColumnName("x_coordinate");

                entity.Property(e => e.YCoordinate).HasColumnName("y_coordinate");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("employee");

                entity.HasIndex(e => e.EmailAddress)
                    .HasName("employee_email_address_key")
                    .IsUnique();

                entity.HasIndex(e => e.PhoneNumber)
                    .HasName("employee_phone_number_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("employee_id");

                entity.Property(e => e.DeskId).HasColumnName("desk_id");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasColumnName("email_address")
                    .HasMaxLength(255);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name")
                    .HasMaxLength(255);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("last_name")
                    .HasMaxLength(255);

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasColumnName("middle_name")
                    .HasMaxLength(255);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnName("phone_number")
                    .HasMaxLength(255);

                entity.Property(e => e.PhotoId)
                    .HasColumnName("photo_id")
                    .HasDefaultValueSql("1");

                entity.Property(e => e.PositionId).HasColumnName("position_id");

                entity.HasOne(emp => emp.Desk)
                    .WithOne(desk => desk.Employee)
                    .HasForeignKey<Desk>(desk => desk.Id)
                    .HasConstraintName("employee_desk_id_fkey");

                entity.HasOne(d => d.Photo)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.PhotoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_photo_id_fkey");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.PositionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("employee_position_id_fkey");
            });

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.ToTable("photo");

                entity.Property(e => e.Id).HasColumnName("photo_id");
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.ToTable("position");

                entity.HasIndex(e => e.Name)
                    .HasName("position_position_name_key")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("position_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("position_name")
                    .HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}