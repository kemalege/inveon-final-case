using Microsoft.AspNetCore.Mvc;

namespace InveonFinalCase.API.Features.Users.Update;

public static class UpdateUserCommandEndpoint
{
    public static RouteGroupBuilder UpdateUserGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapPut("/{userId}",
                async (IMediator mediator, UpdateUserCommand command) => (await mediator.Send(command)).ToGenericResult())
            .WithName("UpdateUser")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ProblemDetails>(StatusCodes.Status404NotFound)
            .RequireAuthorization();

        return group;
    }
}
