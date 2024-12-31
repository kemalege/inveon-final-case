using InveonFinalCase.API.Features.Users.GetById;
using InveonFinalCase.API.Features.Users.Update;

namespace InveonFinalCase.API.Features.Users;

public static class UserEndpointExt
{
    public static void AddUserGroupEndpoints(this WebApplication app)
    {
        app.MapGroup("api/v1/users")
            .WithTags("Users")
            .GetByIdUserGroupItemEndpoint()
            .UpdateUserGroupItemEndpoint();
    }

}