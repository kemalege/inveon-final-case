using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Features.Categories;
using InveonFinalCase.API.Features.Courses;
using InveonFinalCase.API.Features.Orders;
using InveonFinalCase.API.Features.Payments;

namespace InveonFinalCase.API.Repositories
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)

        {
        }

        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        
        public DbSet<Category> Categories { get; set; }
        public DbSet<Course> Courses { get; set; }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(GetType().Assembly);

            base.OnModelCreating(builder);
        }
    }
}