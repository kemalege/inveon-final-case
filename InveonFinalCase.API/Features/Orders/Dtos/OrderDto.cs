namespace InveonFinalCase.API.Features.Orders.Dtos;

public record OrderDto(
    Guid Id,
    DateTime OrderDate,
    decimal TotalAmount,
    string Status,
    List<OrderItemDto> OrderItems);
