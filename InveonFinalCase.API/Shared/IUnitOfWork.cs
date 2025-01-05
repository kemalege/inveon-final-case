namespace InveonFinalCase.API.Shared;

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

public interface IUnitOfWork
{
    Task CommmitAsync();

    void Commit();
}