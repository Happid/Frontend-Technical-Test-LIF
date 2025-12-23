import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerApi, type RegisterRequest } from "../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await registerApi(form);
      toast.success("Register successful");
      navigate("/login");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Register failed");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign up new account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="name@mail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@mail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full text-white bg-orange-600 hover:opacity-90 shadow-xs leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none 
                  ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {isLoading ? "Loading ..." : "Register"}
                </button>
                <p className="text-sm font-light text-gray-500">
                  Have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
