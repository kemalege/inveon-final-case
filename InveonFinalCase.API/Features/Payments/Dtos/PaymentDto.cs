namespace InveonFinalCase.API.Features.Payments.Dtos;

public record PaymentDto(
    string CardType,
    string Last4Digits,
    decimal Amount);
