using InveonFinalCase.API.Features.Orders.Create;
using InveonFinalCase.API.Features.Orders.GetAllByUserId;
using InveonFinalCase.API.Features.Orders.GetById;

namespace InveonFinalCase.API.Features.Orders;

public static class OrderEndpointExt
{
    public static void AddOrderGroupEndpointExt(this WebApplication app)
    {
        app.MapGroup("api/v1/orders").WithTags("Orders")
            .CreateOrderGroupItemEndpoint().RequireAuthorization()
            .GetByUserIdOrdersGroupItemEndpoint().RequireAuthorization()
            .GetByIdOrderGroupItemEndpoint().RequireAuthorization();
    }
}