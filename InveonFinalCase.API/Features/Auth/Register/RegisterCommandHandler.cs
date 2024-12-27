using System.Net;
using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Shared;
using MediatR;

namespace InveonFinalCase.API.Features.Auth.Register;

using Microsoft.AspNetCore.Identity;

public class RegisterCommandHandler(UserManager<AppUser> userManager)
    : IRequestHandler<RegisterCommand, ServiceResult<RegisterResponse>>
{
    public async Task<ServiceResult<RegisterResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = new AppUser
        {
            UserName = request.UserName,
            Email = request.Email,
            City = request.City
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return ServiceResult<RegisterResponse>.Error("User creation failed", errors, HttpStatusCode.BadRequest);
        }

        return ServiceResult<RegisterResponse>.SuccessAsOk(new RegisterResponse(user.Id));
    }
}
