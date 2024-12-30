namespace InveonFinalCase.API.Features.Orders.Dtos;

public record OrderItemDto(
    Guid CourseId,
    string CourseName,
    string CourseDescription,
    decimal Price);
