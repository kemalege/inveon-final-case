namespace InveonFinalCase.API.Features.Auth;

using System;

public class ClientTokenDto
{
    public string AccessToken { get; set; }

    public DateTime AccessTokenExpiration { get; set; }
}