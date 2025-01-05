using InveonFinalCase.API.Shared.Filters;

namespace InveonFinalCase.API.Features.Auth.Register;

using Microsoft.AspNetCore.Builder;
using MediatR;

public static class RegisterEndpoint
{
    public static RouteGroupBuilder RegisterGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapPost("/register", async (RegisterCommand command, IMediator mediator) => (await mediator.Send(command)).ToGenericResult())
            .WithName("Register")
            .AddEndpointFilter<ValidationFilter<RegisterCommand>>();

        return group;
    }
}
