using InveonFinalCase.API.Features.Auth.RefreshToken;

namespace InveonFinalCase.API.Features.Auth;

using AutoMapper;

public class AuthMappingProfile : Profile
{
    public AuthMappingProfile()
    {
        CreateMap<TokenDto, RefreshTokenResponse>()
            .ConstructUsing(src => new RefreshTokenResponse(src));
    }
}

