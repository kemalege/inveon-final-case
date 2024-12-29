using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InveonFinalCase.API.Repositories;

internal class OrderItemEntityConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder.HasKey(oi => oi.Id);
        builder.Property(oi => oi.Price).HasColumnType("decimal(18,2)").IsRequired();

        builder.HasOne(oi => oi.Course)
            .WithMany()
            .HasForeignKey(oi => oi.CourseId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
