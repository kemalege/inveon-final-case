using InveonFinalCase.API.Features.Orders.Dtos;
using InveonFinalCase.API.Features.Payments.Dtos;

namespace InveonFinalCase.API.Features.Orders.Create;

public record CreateOrderCommand(
    Guid UserId,
    List<OrderItemDto> OrderItems,
    PaymentDto Payment) : IRequestByServiceResult<Guid>;