using InveonFinalCase.API.Features.Auth.Login;

namespace InveonFinalCase.API.Features.Auth;

public static class AuthEndpointExt
{
    public static void AddCategoryGroupEndpointExt(this WebApplication app)
    {
        app.MapGroup("api/v1/auth").WithTags("Authorization")
            .LoginGroupItemEndpoint();
    }
}