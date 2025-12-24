import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore.ts";
import { useNavigate } from "react-router-dom";
import { useTodoStore } from "../store/todoStore.ts";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { reset } = useTodoStore();

  const handleLogout = () => {
    reset();
    logout();
    toast.success("Logout successful");
    navigate("/todos");
  };

  return (
    <>
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
                className="h-8 w-auto"
              />
            </div>
            <div className="flex flex-1 justify-end">
              <a
                onClick={handleLogout}
                className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
              >
                Log out <span aria-hidden="true">→</span>
              </a>
            </div>
          </nav>
        </header>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
