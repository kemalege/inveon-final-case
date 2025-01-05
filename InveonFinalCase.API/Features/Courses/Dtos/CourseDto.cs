using InveonFinalCase.API.Features.Categories.Dtos;

namespace InveonFinalCase.API.Features.Courses.Dtos;

public record CourseDto(
    Guid Id,
    string Name,
    string Instructor,
    string Description,
    decimal Price,
    string ImageUrl,
    CategoryDto Category);