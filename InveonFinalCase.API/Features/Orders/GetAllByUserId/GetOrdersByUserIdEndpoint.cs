using InveonFinalCase.API.Features.Orders.Dtos;

namespace InveonFinalCase.API.Features.Orders.GetAllByUserId;

public record GetOrdersByUserIdQuery(Guid UserId) : IRequestByServiceResult<List<OrderDto>>;

public class GetOrdersByUserIdQueryHandler(AppDbContext context, IMapper mapper)
    : IRequestHandler<GetOrdersByUserIdQuery, ServiceResult<List<OrderDto>>>
{
    public async Task<ServiceResult<List<OrderDto>>> Handle(GetOrdersByUserIdQuery request, CancellationToken cancellationToken)
    {
        // Get orders for the given user
        var orders = await context.Orders
            .Where(x => x.UserId == request.UserId)
            .Include(o => o.OrderItems) // Include order items
            .ToListAsync(cancellationToken: cancellationToken);

        if (orders == null || !orders.Any())
        {
            return ServiceResult<List<OrderDto>>.Error(
                "No orders found",
                $"No orders found for the user with id ({request.UserId}).",
                HttpStatusCode.NotFound);
        }

        // Map to DTOs
        var ordersAsDto = mapper.Map<List<OrderDto>>(orders);

        return ServiceResult<List<OrderDto>>.SuccessAsOk(ordersAsDto);
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
