import { Navigate, Route, Routes } from "react-router";
import AnalysisPage from "./pages/AnalysisPage";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UploadPage from "./pages/UploadPage";
import { Header } from "./components/layout/header-2";

const App = () => {
  return (
    <div className="dark bg-black min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </div>
  );
};

export default App;
