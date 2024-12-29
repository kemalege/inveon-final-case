namespace InveonFinalCase.API.Features.Orders.Dtos;

public record OrderItemDto(
    Guid CourseId,
    decimal Price);
