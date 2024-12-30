using InveonFinalCase.API.Features.Orders.Dtos;

namespace InveonFinalCase.API.Features.Orders.GetAllByUserId;

public record GetOrdersByUserIdQuery(Guid UserId) : IRequestByServiceResult<List<OrderSummaryDto>>;

public class GetOrdersByUserIdQueryHandler(AppDbContext context, IMapper mapper)
    : IRequestHandler<GetOrdersByUserIdQuery, ServiceResult<List<OrderSummaryDto>>>
{
    public async Task<ServiceResult<List<OrderSummaryDto>>> Handle(GetOrdersByUserIdQuery request, CancellationToken cancellationToken)
    {
        var orders = await context.Orders
            .Where(x => x.UserId == request.UserId)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Course)  // <-- Eager-load the Course
            .Include(o => o.Payment)
            .ToListAsync(cancellationToken);


        if (orders.Count == 0)
        {
            return ServiceResult<List<OrderSummaryDto>>.Error(
                "No orders found",
                $"No orders found for the user with id ({request.UserId}).",
                HttpStatusCode.NotFound);
        }

        // Map to DTOs
        var ordersAsDto = mapper.Map<List<OrderSummaryDto>>(orders);

        return ServiceResult<List<OrderSummaryDto>>.SuccessAsOk(ordersAsDto);
    }
}

public static class GetOrdersByUserIdEndpoint
{
    public static RouteGroupBuilder GetByUserIdOrdersGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapGet("/user/{userId:guid}",
                async (IMediator mediator, Guid userId) =>
                    (await mediator.Send(new GetOrdersByUserIdQuery(userId))).ToGenericResult())
            .WithName("GetByUserIdOrders")
            .RequireAuthorization();

        return group;
    }
}
