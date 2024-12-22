import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav/Nav";
import Vote from "./components/President/Vote";
import Party from "./components/Parties/Party";
import Position from "./components/Position/Position";
import Details from "./components/Details/Details";
import AddDetails from "./components/AddDetails/AddDetails";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import VCountDetails from "./components/VCountDetails/VCountDetails";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/home",
    element: (
      <>
        <Nav />
        <Home />
      </>
    ),
  },
  {
    path: "/vote",
    element: (
      <>
        <Nav /> <Party />
      </>
    ),
  },
  {
    path: "/details",
    element: (
      <>
        <Nav /> <Details />
      </>
    ),
  },
  {
    path: "/position",
    element: (
      <>
        {" "}
        <Nav />
        <Position />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        {" "}
        <Nav />
        <About />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        {" "}
        <Nav />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/dashboard/:positionId",
    element: (
      <>
        {" "}
        <Nav />
        <VCountDetails />
      </>
    ),
  },
  {
    path: "/addDetail",
    element: (
      <>
        {" "}
        <Nav />
        <AddDetails />
      </>
    ),
  },
  {
    path: "/:position",
    element: (
      <>
        {" "}
        <Nav /> <Vote />
      </>
    ),
  },
]);

function App() {
  return (
    <div className="content">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
