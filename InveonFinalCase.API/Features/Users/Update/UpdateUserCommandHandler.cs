using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Shared.Helpers;
using Microsoft.AspNetCore.Identity;

namespace InveonFinalCase.API.Features.Users.Update;

public class UpdateUserCommandHandler(UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor)
    : IRequestHandler<UpdateUserCommand, ServiceResult>
{
    public async Task<ServiceResult> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var userId = TokenHelper.GetUserId(httpContextAccessor.HttpContext);
        var user = await userManager.FindByIdAsync(userId.ToString());

        if (user is null)
        {
            return ServiceResult.Error(
                "User not found",
                $"The user with id({userId}) was not found.",
                HttpStatusCode.NotFound);
        }

        user.UserName = request.UserName ?? user.UserName;
        user.Email = request.Email ?? user.Email;
        user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
        user.City = request.City ?? user.City;

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return ServiceResult.Error(
                "Update failed",
                string.Join(", ", result.Errors.Select(e => e.Description)),
                HttpStatusCode.BadRequest);
        }

        return ServiceResult.SuccessAsNoContent();
    }
}
