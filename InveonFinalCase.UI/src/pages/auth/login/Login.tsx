import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg">
        
        <div className="hidden md:flex items-center justify-center bg-purple-100 rounded-l-lg">
        <img
            src="/assets/loginImage2.jpg"
            alt="Login Illustration"
            className="object-cover w-full h-full rounded-l-lg" 
          />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
