import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {
  return (
    <div className="flex mt-32 items-center justify-center h-full bg-background">
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 gap-6 bg-card shadow-lg rounded-lg border border-border">
        
        <div className="hidden md:flex items-center justify-center bg-primary/20 rounded-l-lg">
          <img
            src="/assets/loginImage2.jpg"
            alt="Login Illustration"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-center text-foreground">Register</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
