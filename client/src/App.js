import { Routes, Route } from "react-router-dom";
import { Auth, Home } from "./pages";
import { Navbar } from "./components";
import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <div className="w-full py-7 min-h-screen px-7 bg-slate-200">
        <Navbar />
        <Routes>
          <Route
            index
            path="/"
            element={<Home loading={loading} setLoading={setLoading} />}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
