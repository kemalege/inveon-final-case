using InveonFinalCase.API.Features.Auth.Login;
using InveonFinalCase.API.Features.Auth.Register;

namespace InveonFinalCase.API.Features.Auth;

public static class AuthEndpointExt
{
    public static void AddAuthenticationGroupEndpoints(this WebApplication app)
    {
        app.MapGroup("api/v1/auth").WithTags("Authorization")
            .LoginGroupItemEndpoint()
            .RegisterGroupItemEndpoint();
    }
}