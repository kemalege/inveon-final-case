namespace InveonFinalCase.API.Features.Payments; 
using InveonFinalCase.API.Features.Orders; 

public enum PaymentStatus
{
    Pending,
    Successful,
    Failed
}

public class Payment : BaseEntity
{
    public Guid OrderId { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public DateTime PaymentDate { get; set; }
    public decimal Amount { get; set; }

    public string CardType { get; set; } = default!;
    public string Last4Digits { get; set; } = default!;

    public Order Order { get; set; } = default!;
}

