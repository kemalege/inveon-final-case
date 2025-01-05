import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { CartHeaderButton } from "./CartHeaderButton";
import { Search } from "lucide-react";
import { ProfileDropDown } from "./ProfileDropdown";

export const categories = [
    { id: "B52FE623-0B28-46DD-88C2-983A0C724990", name: "Software Development" },
    { id: "A4CFE623-1B45-46DD-99C2-983A0C724221", name: "Design" },
    { id: "C3D4E623-0B28-99DD-11C2-983A0C724322", name: "Health and Fitness" },
    { id: "D52FE111-0B28-22DD-55C2-983A0C724933", name: "Music" }
];

export function Header() {
  const { isAuthenticated, getDecodedToken, logout } = useAuth();
  const navigate = useNavigate();
  const isAuth = isAuthenticated;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = getDecodedToken() as any;

  return (
      <header className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="container mx-auto px-4 flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                  <Link to="/" className="text-primary text-xl font-bold">
                      <span className="text-purple-600">Invony</span>
                  </Link>
                  <div className="relative flex-1">
                      <Input type="text" placeholder="Search for anything" className="pl-10" />
                      <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
                  </div>
              </div>

              <div className="flex items-center space-x-4">
                  {!isAuth && <Button variant="ghost" onClick={() => navigate("/register") }>Register</Button>}
                  {token && token.roles && token.roles.includes("Instructor") && 
                    <div className="text-sm text-primary">
                      <Link to="/instructor/dashboard" className="block hover:text-purple-600">
                          Instructor Dashboard
                      </Link>
                    </div>}
                  {isAuth ? (
                      <>
                          <div className="text-sm text-primary">
                            <Link to="/home/learning-content" className="block hover:text-purple-600">
                                Learning Content
                            </Link>
                          </div>
                          <Button variant="ghost" onClick={logout}>Logout</Button>
                          <CartHeaderButton cartItemCount={2} />
                          <ProfileDropDown token={token} />
                      </>
                  ) : (
                      <Link to="/login">
                          <Button variant="default">Login</Button>
                      </Link>
                  )}
                  <ModeToggle />
              </div>
          </div>

            {window.location.pathname === "/" && (
              <nav className="bg-primary-foreground text-secondary-foreground">
                <div className="container mx-auto px-4 py-2 flex items-center space-x-8 text-sm font-medium">
                {categories.map(category => (
                  <Link key={category.id} to="/" className="hover:text-primary">
                    {category.name}
                  </Link>
                ))}
                </div>
              </nav>
            )}
      </header>
  );
}