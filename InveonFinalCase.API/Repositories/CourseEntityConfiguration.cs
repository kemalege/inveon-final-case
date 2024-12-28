using InveonFinalCase.API.Features.Courses;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InveonFinalCase.API.Repositories;

public class CourseEntityConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Price).HasColumnType("decimal(18,2)");
    }
}