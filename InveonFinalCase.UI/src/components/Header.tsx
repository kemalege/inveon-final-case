// components/Header.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";

export function Header() {
    const { auth, logout } = useAuth();

    const isAuth = auth?.user;

    return (
        <header className="sticky top-0 z-40 bg-background border-b border-border">
            <div className="container mx-auto px-4 flex items-center justify-between py-2">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-primary text-lg font-bold">
                        <span className="text-purple-600">Invony</span>
                    </Link>
                    <div className="relative flex-1">
                        <Input type="text" placeholder="Search for anything" className="pl-10" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 15l5.5 5.5M4 10a6 6 0 1112 0 6 6 0 01-12 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                  {!isAuth && <Button variant="ghost">Register</Button>}
                  
                  {isAuth ? (
                    <>
                      <Button variant="ghost" onClick={logout}>
                        Logout
                      </Button>
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-foreground">
                        {auth?.user?.split("")[0].toUpperCase()}
                      </div>
                    </>
                  ) : (
                    <Link to="/login">
                      <Button variant="default">Login</Button>
                    </Link>
                  )}
                  <ModeToggle />
                </div>
            </div>

            {isAuth && <nav className="bg-primary-foreground text-secondary-foreground">
                <div className="container mx-auto px-4 py-2 flex items-center space-x-8 text-sm font-medium">
                  <Link to="/" className="hover:text-primary">Software Development</Link>
                  <Link to="/" className="hover:text-primary">Design</Link>
                  <Link to="/" className="hover:text-primary">Health and Fitness</Link>
                  <Link to="/" className="hover:text-primary">Music</Link>
                </div>
            </nav>}
        </header>
    );
}
