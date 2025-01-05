using InveonFinalCase.API.Features.Payments;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InveonFinalCase.API.Repositories;

internal class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Amount)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.PaymentDate)
            .IsRequired();

        builder.Property(p => p.Status)
            .HasConversion<string>()
            .IsRequired();

        builder.HasOne(p => p.Order)
            .WithOne(o => o.Payment)
            .HasForeignKey<Payment>(p => p.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
