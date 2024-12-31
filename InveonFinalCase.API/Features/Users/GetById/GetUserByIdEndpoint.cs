using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Features.Users.Dtos;
using Microsoft.AspNetCore.Identity;

namespace InveonFinalCase.API.Features.Users.GetById;

public record GetUserByIdQuery(string UserId) : IRequestByServiceResult<UserDto>;

public class GetUserByIdQueryHandler(UserManager<AppUser> userManager, IMapper mapper)
    : IRequestHandler<GetUserByIdQuery, ServiceResult<UserDto>>
{
    public async Task<ServiceResult<UserDto>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.UserId);

        if (user is null)
        {
            return ServiceResult<UserDto>.Error(
                "User not found",
                $"The user with id({request.UserId}) was not found.",
                HttpStatusCode.NotFound);
        }

        var userAsDto = mapper.Map<UserDto>(user);
        return ServiceResult<UserDto>.SuccessAsOk(userAsDto);
    }
}

public static class GetUserByIdEndpoint
{
    public static RouteGroupBuilder GetByIdUserGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapGet("/{userId}",
                async (IMediator mediator, string userId) =>
                    (await mediator.Send(new GetUserByIdQuery(userId))).ToGenericResult())
            .WithName("GetUserById");

        return group;
    }
}


