import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router/AppRouter.tsx";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <AppRouter />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
