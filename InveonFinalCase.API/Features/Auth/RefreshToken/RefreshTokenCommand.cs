namespace InveonFinalCase.API.Features.Auth.RefreshToken;

public record RefreshTokenCommand(string RefreshToken) : IRequestByServiceResult<RefreshTokenResponse>;
