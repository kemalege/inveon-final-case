using InveonFinalCase.API.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace InveonFinalCase.API.Features.Auth.RefreshToken;

public class RefreshTokenCommandHandler(
    ITokenService tokenService,
    IGenericRepository<UserRefreshToken> userRefreshTokenRepository,
    UserManager<AppUser> userManager,
    IUnitOfWork unitOfWork,
    IMapper mapper)
    : IRequestHandler<RefreshTokenCommand, ServiceResult<RefreshTokenResponse>>
{
    public async Task<ServiceResult<RefreshTokenResponse>> Handle(RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        var refreshTokenEntity = await userRefreshTokenRepository
            .Where(r => r.Code == request.RefreshToken)
            .SingleOrDefaultAsync();

        if (refreshTokenEntity == null || refreshTokenEntity.Expiration < DateTime.Now)
        {
            return ServiceResult<RefreshTokenResponse>.Error(
                "Refresh token is invalid or expired",
                "The provided refresh token is invalid or expired.",
                HttpStatusCode.Unauthorized);
        }

        var user = await userManager.FindByIdAsync(refreshTokenEntity.UserId);
        if (user == null)
        {
            return ServiceResult<RefreshTokenResponse>.Error(
                "User not found",
                "User not found for this refresh token",
                HttpStatusCode.Unauthorized);
        }

        var newTokenDto = tokenService.CreateToken(user);

        refreshTokenEntity.Code = newTokenDto.RefreshToken;
        refreshTokenEntity.Expiration = newTokenDto.RefreshTokenExpiration;

        await unitOfWork.CommmitAsync();

        var response = mapper.Map<RefreshTokenResponse>(newTokenDto);

        return ServiceResult<RefreshTokenResponse>.SuccessAsOk(response);
    }
}