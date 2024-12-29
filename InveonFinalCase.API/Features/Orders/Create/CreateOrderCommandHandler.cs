using InveonFinalCase.API.Shared.Helpers;

namespace InveonFinalCase.API.Features.Orders.Create;

public class CreateOrderCommandHandler(AppDbContext context, IHttpContextAccessor httpContextAccessor)
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

        var newOrder = new Order
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            OrderDate = DateTime.Now,
            TotalAmount = request.OrderItems.Sum(x => x.Price),
            Status = OrderStatus.Pending
        };

        newOrder.OrderItems = request.OrderItems.Select(item => new OrderItem
        {
            Id = Guid.NewGuid(),
            OrderId = newOrder.Id,
            CourseId = item.CourseId,
            Price = item.Price
        }).ToList();

        context.Orders.Add(newOrder);
        await context.SaveChangesAsync(cancellationToken);

        return ServiceResult<Guid>.SuccessAsCreated(newOrder.Id, $"/api/orders/{newOrder.Id}");
    }
}
