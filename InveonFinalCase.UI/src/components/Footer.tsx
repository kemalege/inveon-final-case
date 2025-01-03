import { Link } from "react-router";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-8 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                
                <div className="flex flex-col space-y-4 text-center md:text-left">
                    <Link to="/" className="text-xl font-bold text-primary">
                        Invony
                    </Link>
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Invony. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-6 mt-6 md:mt-0">
                    <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-all">About</Link>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-all">Contact</Link>
                    <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-all">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
