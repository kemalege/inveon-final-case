using InveonFinalCase.API.Features.Orders.Create;

namespace InveonFinalCase.API.Features.Orders;

public static class OrderEndpointExt
{
    public static void AddOrderGroupEndpointExt(this WebApplication app)
    {
        app.MapGroup("api/v1/orders").WithTags("Orders")
            .CreateOrderGroupItemEndpoint().RequireAuthorization();
    }
}