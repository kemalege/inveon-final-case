import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col mt-32 items-center justify-center text-center space-y-6">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground">
        The page you are looking for doesn't exist.
      </p>
      <Link to="/" className="text-primary hover:underline">
        Go to Homepage
      </Link>
    </div>
  );
}
