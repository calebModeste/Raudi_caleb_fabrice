import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CarId from "./pages/CarId";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout children={<Homepage />} />} />
          <Route path="/cars/:id" element={<Layout children={<CarId />} />} />
          <Route
            path="/dashboard"
            element={<Layout children={<Dashboard />} />}
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
