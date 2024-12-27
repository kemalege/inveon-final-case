using InveonFinalCase.API.Shared;

namespace InveonFinalCase.API.Features.Auth.Register;

public record RegisterCommand(string UserName, string Email, string Password, string City) : IRequestByServiceResult<RegisterResponse>;
