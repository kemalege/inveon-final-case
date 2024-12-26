using InveonFinalCase.API.Shared;

namespace InveonFinalCase.API.Features.Auth.Login
{
    public record LoginCommand(string Email, string Password) : IRequestByServiceResult<LoginResponse>;
}