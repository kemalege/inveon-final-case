namespace InveonFinalCase.API.Features.Users.Update;

public record UpdateUserCommand(
    string? UserName,
    string? Email,
    string? PhoneNumber,
    string? City) : IRequestByServiceResult;
