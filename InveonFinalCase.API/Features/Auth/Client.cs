namespace InveonFinalCase.API.Features.Auth;

using System;
using System.Collections.Generic;
using System.Text;

public class Client
{
    public string Id { get; set; }

    public string Secret { get; set; }

    public List<String> Audiences { get; set; }
}