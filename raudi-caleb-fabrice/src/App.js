import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CarId from "./pages/CarId";
import { Toaster } from "react-hot-toast";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout children={<Homepage />} />} />
          <Route
            path="/payments"
            element={<Layout children={<PaymentPage />} />}
          />
          <Route path="/cars/:id" element={<Layout children={<CarId />} />} />
          <Route
            path="/dashboard"
            element={<Layout children={<Dashboard />} />}
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
