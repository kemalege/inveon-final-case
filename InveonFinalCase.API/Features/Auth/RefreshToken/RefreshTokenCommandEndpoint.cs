using InveonFinalCase.API.Shared.Filters;

namespace InveonFinalCase.API.Features.Auth.RefreshToken;

public static class RefreshTokenEndpoint
{
    public static RouteGroupBuilder RefreshTokenGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapPost("/refresh-token",
                async (RefreshTokenCommand command, IMediator mediator) =>
                    (await mediator.Send(command)).ToGenericResult())
            .WithName("RefreshToken")
            .AddEndpointFilter<ValidationFilter<RefreshTokenCommand>>();

        return group;
    }
}
