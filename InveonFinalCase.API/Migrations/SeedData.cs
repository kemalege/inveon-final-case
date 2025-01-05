using InveonFinalCase.API.Domain.Entities;
using InveonFinalCase.API.Features.Categories;
using InveonFinalCase.API.Features.Courses;
using InveonFinalCase.API.Features.Orders;
using InveonFinalCase.API.Features.Payments;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public static class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        context.Database.Migrate();

        // Seed Roles
        var roles = new List<string> { "Instructor", "User" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        // Seed Categories
        var categoryNames = new List<string> { "Software Development", "Marketing", "Business", "Design", "Music" };

        foreach (var categoryName in categoryNames)
        {
            if (!await context.Categories.AnyAsync(c => c.Name == categoryName))
            {
                context.Categories.Add(new Category { Name = categoryName });
            }
        }

        await context.SaveChangesAsync();

        // Seed Users
        var instructorUser = await userManager.FindByEmailAsync("invony@academy.com");
        if (instructorUser == null)
        {
            instructorUser = new AppUser
            {
                UserName = "Invony",
                Email = "invony@academy.com",
                City = "Istanbul"
            };
            await userManager.CreateAsync(instructorUser, "Test*1234");
            await userManager.AddToRoleAsync(instructorUser, "Instructor");
        }

        var user1 = await userManager.FindByEmailAsync("kemalege@example.com");
        if (user1 == null)
        {
            user1 = new AppUser
            {
                UserName = "kemalege",
                Email = "kemalege@example.com",
                City = "Denizli"
            };
            await userManager.CreateAsync(user1, "Test*1234");
            await userManager.AddToRoleAsync(user1, "User");
        }

        var user2 = await userManager.FindByEmailAsync("ahmetkaya@example.com");
        if (user2 == null)
        {
            user2 = new AppUser
            {
                UserName = "ahmetkaya",
                Email = "ahmetkaya@example.com",
                City = "Izmir"
            };
            await userManager.CreateAsync(user2, "Test*1234");
            await userManager.AddToRoleAsync(user2, "User");
        }

        // Seed Courses for Instructor (3 Courses)
        if (!context.Courses.Any())
        {
            var categories = context.Categories.ToList();
            context.Courses.AddRange(new List<Course>
            {
                new Course
                {
                    Name = "Advanced C#",
                    Description = "Master advanced C# concepts",
                    Price = 150,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First().Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Marketing 101",
                    Description = "Introduction to marketing strategies",
                    Price = 120,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories[1].Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Business Growth",
                    Description = "Strategies for business expansion",
                    Price = 200,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories[2].Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Advanced C#",
                    Description = "Master advanced C# concepts",
                    Price = 150,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Software Development").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Java for Beginners",
                    Description = "Learn Java from scratch",
                    Price = 120,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Software Development").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "React.js Essentials",
                    Description = "Learn the basics of React.js",
                    Price = 100,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Software Development").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },

                // Marketing
                new Course
                {
                    Name = "Digital Marketing Masterclass",
                    Description = "Comprehensive digital marketing guide",
                    Price = 130,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Marketing").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "SEO Basics",
                    Description = "Learn the fundamentals of SEO",
                    Price = 80,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Marketing").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Content Marketing Strategies",
                    Description = "Effective content marketing techniques",
                    Price = 90,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Marketing").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },

                // Business
                new Course
                {
                    Name = "Entrepreneurship Fundamentals",
                    Description = "Start your own business",
                    Price = 200,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Business").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Financial Management 101",
                    Description = "Understand business finance basics",
                    Price = 150,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Business").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },

                // Design
                new Course
                {
                    Name = "Graphic Design with Photoshop",
                    Description = "Master graphic design fundamentals",
                    Price = 120,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Design").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "UI/UX Design Basics",
                    Description = "Introduction to UI/UX design principles",
                    Price = 100,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Design").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },

                // Music
                new Course
                {
                    Name = "Guitar for Beginners",
                    Description = "Learn to play guitar from scratch",
                    Price = 80,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Music").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                },
                new Course
                {
                    Name = "Piano Masterclass",
                    Description = "Master piano playing techniques",
                    Price = 150,
                    Instructor = instructorUser.UserName,
                    CategoryId = categories.First(c => c.Name == "Music").Id,
                    Created = DateTime.Now,
                    UserId = Guid.Parse(instructorUser.Id)
                }
            });
            await context.SaveChangesAsync();
        }

        // Seed Orders and Payments for User1
        var course1 = context.Courses.First();
        if (!context.Orders.Any())
        {
            var newOrder = new Order
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(user1.Id),
                OrderDate = DateTime.Now,
                TotalAmount = course1.Price,
                Status = OrderStatus.Pending
            };

            await context.Orders.AddAsync(newOrder);
            await context.SaveChangesAsync();

            // Seed OrderItem
            var orderItem = new OrderItem
            {
                Id = Guid.NewGuid(),
                OrderId = newOrder.Id,
                CourseId = course1.Id,
                Price = course1.Price
            };
            await context.OrderItems.AddAsync(orderItem);
            await context.SaveChangesAsync();

            // Seed Payment
            var payment = new Payment
            {
                Id = Guid.NewGuid(),
                OrderId = newOrder.Id,
                PaymentDate = DateTime.Now,
                Amount = course1.Price,
                CardType = "Visa",
                Last4Digits = "1234",
                Status = PaymentStatus.Pending
            };
            await context.Payments.AddAsync(payment);
            await context.SaveChangesAsync();

            // Seed Orders and Payments for User2 with two OrderItems
            var coursesForUser2 = context.Courses.Take(2).ToList();
            if (!context.Orders.Any(o => o.UserId == Guid.Parse(user2.Id)))
            {
                var newOrderForUser2 = new Order
                {
                    Id = Guid.NewGuid(),
                    UserId = Guid.Parse(user2.Id),
                    OrderDate = DateTime.Now,
                    TotalAmount = coursesForUser2.Sum(c => c.Price),
                    Status = OrderStatus.Pending
                };

                await context.Orders.AddAsync(newOrderForUser2);
                await context.SaveChangesAsync();

                // Seed OrderItems (2 items for user2)
                var orderItemsForUser2 = coursesForUser2.Select(course => new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = newOrderForUser2.Id,
                    CourseId = course.Id,
                    Price = course.Price
                }).ToList();

                await context.OrderItems.AddRangeAsync(orderItemsForUser2);
                await context.SaveChangesAsync();

                // Seed Payment for the combined order
                var paymentForUser2 = new Payment
                {
                    Id = Guid.NewGuid(),
                    OrderId = newOrderForUser2.Id,
                    PaymentDate = DateTime.Now,
                    Amount = newOrderForUser2.TotalAmount,
                    CardType = "Mastercard",
                    Last4Digits = "5678",
                    Status = PaymentStatus.Pending
                };

                await context.Payments.AddAsync(paymentForUser2);
                await context.SaveChangesAsync();
            }
            // Seed an additional Order and Payment for User2 with one OrderItem
            var singleCourseForUser2 = context.Courses.Skip(2).FirstOrDefault();
            if (singleCourseForUser2 != null && !context.Orders.Any(o => o.UserId == Guid.Parse(user2.Id) && o.TotalAmount == singleCourseForUser2.Price))
            {
                var additionalOrderUser2 = new Order
                {
                    Id = Guid.NewGuid(),
                    UserId = Guid.Parse(user2.Id),
                    OrderDate = DateTime.Now,
                    TotalAmount = singleCourseForUser2.Price,
                    Status = OrderStatus.Pending
                };

                await context.Orders.AddAsync(additionalOrderUser2);
                await context.SaveChangesAsync();

                // Seed a single OrderItem for the additional order
                var additionalOrderItemUser2 = new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = additionalOrderUser2.Id,
                    CourseId = singleCourseForUser2.Id,
                    Price = singleCourseForUser2.Price
                };

                await context.OrderItems.AddAsync(additionalOrderItemUser2);
                await context.SaveChangesAsync();

                // Seed Payment for the additional order
                var additionalPaymentUser2 = new Payment
                {
                    Id = Guid.NewGuid(),
                    OrderId = additionalOrderUser2.Id,
                    PaymentDate = DateTime.Now,
                    Amount = singleCourseForUser2.Price,
                    CardType = "Amex",
                    Last4Digits = "7890",
                    Status = PaymentStatus.Pending
                };

                await context.Payments.AddAsync(additionalPaymentUser2);
                await context.SaveChangesAsync();
            }

        }
    }
}