using InveonFinalCase.API.Features.Orders.Dtos;

namespace InveonFinalCase.API.Features.Orders.Create;

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleForEach(x => x.OrderItems)
            .SetValidator(new CreateOrderItemDtoValidator());
    }
}

public class CreateOrderItemDtoValidator : AbstractValidator<OrderItemDto>
{
    public CreateOrderItemDtoValidator()
    {
        RuleFor(x => x.CourseId)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("{PropertyName} must be greater than 0.");
    }
}
