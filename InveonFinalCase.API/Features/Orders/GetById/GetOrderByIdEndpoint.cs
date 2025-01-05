using InveonFinalCase.API.Features.Orders.Dtos;

namespace InveonFinalCase.API.Features.Orders.GetById;

public record GetOrderByIdQuery(Guid OrderId) : IRequestByServiceResult<OrderSummaryDto>;

public class GetOrderByIdQueryHandler(AppDbContext context, IMapper mapper)
    : IRequestHandler<GetOrderByIdQuery, ServiceResult<OrderSummaryDto>>
{
    public async Task<ServiceResult<OrderSummaryDto>> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var order = await context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Course)
            .Include(o => o.Payment)
            .FirstOrDefaultAsync(x => x.Id == request.OrderId, cancellationToken: cancellationToken);

        if (order == null)
        {
            return ServiceResult<OrderSummaryDto>.Error(
                "Order not found",
                $"The order with id ({request.OrderId}) was not found.",
                HttpStatusCode.NotFound);
        }

        var orderDto = mapper.Map<OrderSummaryDto>(order);

        return ServiceResult<OrderSummaryDto>.SuccessAsOk(orderDto);
    }
}


public static class GetOrderByIdEndpoint
{
    public static RouteGroupBuilder GetByIdOrderGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapGet("/{orderId:guid}",
                async (IMediator mediator, Guid orderId) =>
                    (await mediator.Send(new GetOrderByIdQuery(orderId))).ToGenericResult())
            .RequireAuthorization()
            .WithName("GetOrderById");

        return group;
    }
}

