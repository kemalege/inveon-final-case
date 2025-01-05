using InveonFinalCase.API.Domain.Entities;

namespace InveonFinalCase.API.Features.Auth;

using System;
using System.Collections.Generic;
using System.Text;

public interface ITokenService
{
    TokenDto CreateToken(AppUser userApp);

    ClientTokenDto CreateTokenByClient(Client client);
}