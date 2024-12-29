using InveonFinalCase.API.Features.Orders.Dtos;

namespace InveonFinalCase.API.Features.Orders.Create;

public record CreateOrderCommand(
    Guid UserId,
    List<OrderItemDto> OrderItems) : IRequestByServiceResult<Guid>;