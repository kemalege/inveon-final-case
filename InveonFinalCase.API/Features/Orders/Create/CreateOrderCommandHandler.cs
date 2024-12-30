using InveonFinalCase.API.Features.Payments;
using InveonFinalCase.API.Shared.Helpers;

namespace InveonFinalCase.API.Features.Orders.Create;

public class CreateOrderCommandHandler(AppDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    : IRequestHandler<CreateOrderCommand, ServiceResult<Guid>>
{
    public async Task<ServiceResult<Guid>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var userId = TokenHelper.GetUserId(httpContextAccessor.HttpContext);
        
        foreach (var item in request.OrderItems)
        {
            var courseExists = await context.Courses.AnyAsync(x => x.Id == item.CourseId, cancellationToken);
            if (!courseExists)
            {
                return ServiceResult<Guid>.Error("Course not found.",
                    $"The Course with id({item.CourseId}) was not found.", HttpStatusCode.NotFound);
            }
        }
        
        var newOrder = mapper.Map<Order>(request);

        newOrder.Id = Guid.NewGuid();
        newOrder.UserId = userId;
        newOrder.TotalAmount = request.OrderItems.Sum(x => x.Price);
        newOrder.OrderDate = DateTime.Now;
        newOrder.Status = OrderStatus.Pending;

        newOrder.OrderItems = request.OrderItems.Select(item => new OrderItem
        {
            Id = Guid.NewGuid(),
            OrderId = newOrder.Id,
            CourseId = item.CourseId,
            Price = item.Price
        }).ToList();

        context.Orders.Add(newOrder);

        var newPayment = new Payment()
        {
            Id = Guid.NewGuid(),
            OrderId = newOrder.Id,
            PaymentDate = DateTime.Now,
            Amount = newOrder.TotalAmount,
            Status = PaymentStatus.Pending,
            CardType = request.Payment.CardType,
            Last4Digits = request.Payment.Last4Digits
        };

        context.Payments.Add(newPayment);

        await context.SaveChangesAsync(cancellationToken);

        return ServiceResult<Guid>.SuccessAsCreated(newOrder.Id, $"/api/orders/{newOrder.Id}");
    }
}

