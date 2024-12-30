using InveonFinalCase.API.Features.Orders.Create;
using InveonFinalCase.API.Features.Orders.Dtos;
using InveonFinalCase.API.Features.Payments;
using InveonFinalCase.API.Features.Payments.Dtos;

namespace InveonFinalCase.API.Features.Orders;

public class OrderMapping : Profile
{
    public OrderMapping()
    {
        CreateMap<Order, OrderDto>();
        
        CreateMap<Order, OrderSummaryDto>();

        CreateMap<OrderItem, OrderItemDto>();

        CreateMap<Payment, PaymentDto>();

        CreateMap<CreateOrderCommand, Order>()
            .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.Payment.Amount));

        CreateMap<OrderItemDto, OrderItem>();

        CreateMap<PaymentDto, Payment>();
    }
}


