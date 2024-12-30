using InveonFinalCase.API.Features.Payments.Dtos;

namespace InveonFinalCase.API.Features.Orders.Dtos;

public record OrderSummaryDto(
    Guid Id,
    DateTime OrderDate,
    decimal TotalAmount,
    List<OrderItemDto> OrderItems,
    PaymentDto Payment);
