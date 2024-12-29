using InveonFinalCase.API.Features.Courses;
using InveonFinalCase.API.Features.Orders;

public class OrderItem: BaseEntity
{
    public Guid OrderId { get; set; }
    public Guid CourseId { get; set; }
    public decimal Price { get; set; }

    public Order Order { get; set; } = default!;
    public Course Course { get; set; } = default!;
}
