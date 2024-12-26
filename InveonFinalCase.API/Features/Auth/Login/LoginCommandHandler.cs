using System.Net;
using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Shared;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace InveonFinalCase.API.Features.Auth.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, ServiceResult<LoginResponse>>
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IGenericRepository<UserRefreshToken> _userRefreshTokenService;
    private readonly IUnitOfWork _unitOfWork;

    public LoginCommandHandler(UserManager<AppUser> userManager, ITokenService tokenService,
        IGenericRepository<UserRefreshToken> userRefreshTokenService, IUnitOfWork unitOfWork)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _userRefreshTokenService = userRefreshTokenService;
        _unitOfWork = unitOfWork;
    }

    public async Task<ServiceResult<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        // var user = new AppUser
        // {
        //     UserName = "ege",
        //     Email = "ege@example.com",
        //     PasswordHash = _userManager.PasswordHasher.HashPassword(null, "test1234")
        // };
        // await _userManager.CreateAsync(user);
        
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return ServiceResult<LoginResponse>.Error("Invalid email or password",
                "The provided email or password is incorrect.", HttpStatusCode.BadRequest);
        }

        var token = _tokenService.CreateToken(user);

        var existingRefreshToken = await _userRefreshTokenService
            .Where(x => x.UserId == user.Id)
            .SingleOrDefaultAsync();

        if (existingRefreshToken == null)
        {
            await _userRefreshTokenService.AddAsync(new UserRefreshToken
            {
                UserId = user.Id,
                Code = token.RefreshToken,
                Expiration = token.RefreshTokenExpiration
            });
        }
        else
        {
            existingRefreshToken.Code = token.RefreshToken;
            existingRefreshToken.Expiration = token.RefreshTokenExpiration;
        }

        await _unitOfWork.CommmitAsync();

        return ServiceResult<LoginResponse>.SuccessAsOk(new LoginResponse(token));
    }
}
