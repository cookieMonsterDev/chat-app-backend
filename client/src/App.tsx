import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
import useRefreshAuth from "./hooks/useRefreshAuth";

const App = () => {

  useRefreshAuth();

  return (
    <Router>
      <main className="relative w-8/12 h-screen m-auto bg-sky-50 max-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
