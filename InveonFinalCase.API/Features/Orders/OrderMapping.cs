using InveonFinalCase.API.Features.Orders.Dtos;

namespace InveonFinalCase.API.Features.Orders;

public class OrderMapping : Profile
{
    public OrderMapping()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<OrderItem, OrderItemDto>();
    }
}
