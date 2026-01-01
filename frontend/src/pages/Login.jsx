import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginAdmin } from "../api/apiMethod";
import { useNavigate } from "@tanstack/react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginAdmin(email, password),
    onSuccess: (res) => {
      console.log(res);
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.log(error);
      setError((prev) => !prev);
      navigate({ to: "/login" });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Please enter your email or username.");
    if (!password) return setError("Please enter your password.");
    // TODO: integrate real auth call
    console.log({ email, password, remember });
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="h-14 w-14 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            W
          </div>
          <h1 className="text-2xl font-semibold">Welcome to webERP</h1>
          <p className="text-sm text-gray-500">
            Sign in to continue to your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>

            <a className="text-sm text-indigo-600 hover:underline" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a className="text-indigo-600 hover:underline" href="#">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
