using InveonFinalCase.API.Features.Categories;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InveonFinalCase.API.Repositories;

public class CategoryEntityConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
    }
}