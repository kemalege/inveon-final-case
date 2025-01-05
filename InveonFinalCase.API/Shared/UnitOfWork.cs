using InveonFinalCase.API.Repositories;

namespace InveonFinalCase.API.Shared;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

public class UnitOfWork : IUnitOfWork
{
    private readonly DbContext _context;

    public UnitOfWork(AppDbContext appDbContext)
    {
        _context = appDbContext;
    }

    public void Commit()
    {
        _context.SaveChanges();
    }

    public async Task CommmitAsync()
    {
        await _context.SaveChangesAsync();
    }
}