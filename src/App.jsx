import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
]);

export default App;
