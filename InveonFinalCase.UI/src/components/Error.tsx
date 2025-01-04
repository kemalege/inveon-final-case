import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorPage({ message = "Something went wrong.", onRetry }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-32 items-center justify-center space-y-6 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500" />
      <h1 className="text-2xl font-bold text-foreground">Oops!</h1>
      <p className="text-lg text-muted-foreground">{message}</p>
      <div className="space-x-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition"
          >
            Retry
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="text-primary underline hover:no-underline"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
