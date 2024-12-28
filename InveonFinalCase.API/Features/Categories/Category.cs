using InveonFinalCase.API.Features.Courses;

namespace InveonFinalCase.API.Features.Categories;

public class Category: BaseEntity
{
    public string Name { get; set; } = default!;
    public ICollection<Course>? Courses { get; set; }
}