using InveonFinalCase.API.Features.Payments;

namespace InveonFinalCase.API.Features.Orders;

public enum OrderStatus
{
    Pending,
    Completed,
    Cancelled
}

public class Order: BaseEntity
{
    public Guid UserId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public Payment Payment { get; set; } = default!;

    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
