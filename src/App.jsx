import { BrowserRouter } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import AuthState from "./context/auth/authState";

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <AuthState>
        <Portfolio />
      </AuthState>
    </BrowserRouter>
  );
}
