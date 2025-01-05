using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Features.Users.Dtos;

namespace InveonFinalCase.API.Features.Users;

public class UserMapping : Profile
{
    public UserMapping()
    {
        CreateMap<AppUser, UserDto>();
    }
}
