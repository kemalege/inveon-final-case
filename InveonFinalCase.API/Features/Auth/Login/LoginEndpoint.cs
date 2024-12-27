using InveonFinalCase.API.Shared.Filters;
using MediatR;

namespace InveonFinalCase.API.Features.Auth.Login;

public static class LoginEndpoint
{
    public static RouteGroupBuilder LoginGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapPost("/login",
                async (LoginCommand command, IMediator mediator) =>
                    (await mediator.Send(command)).ToGenericResult())
            .WithName("Login")
            .AddEndpointFilter<ValidationFilter<LoginCommand>>();

        return group;
    }
}