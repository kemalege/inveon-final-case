import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { CartHeaderButton } from "./CartHeaderButton";
import { Search } from "lucide-react";

export function Header() {
    const { auth, logout } = useAuth();

    const isAuth = auth?.user;

    return (
        <header className="sticky top-0 z-40 bg-background border-b border-border">
            <div className="container mx-auto px-4 flex items-center justify-between py-2">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-primary text-xl font-bold">
                        <span className="text-purple-600">Invony</span>
                    </Link>
                    <div className="relative flex-1">
                        <Input type="text" placeholder="Search for anything" className="pl-10" />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground"/>
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
                      <CartHeaderButton cartItemCount={2} />
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
