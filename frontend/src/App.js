import "./App.css";
import Outpass from "./components/Outpass";
import Faculty from "./screens/Faculty/Faculty";
import Warden from "./screens/Warden/Warden";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Searchresults from "./screens/Searchresult/Searchresults";
import Student from "./screens/Student/Student";
import Apply from "./screens/Apply/Apply";
import QrScanner from "./components/QrScanner";
import QrCode from "./components/QrCode";
import Login from "./screens/Login/Login";
import Navbar from "./components/Navbar";
import Security from "./screens/Security/Security";
import ViewHistory from "./components/Viewhistory";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main className="App">
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/faculty" element={<Faculty />} exact />
          <Route path="/warden" element={<Warden />} exact />
          <Route path="/student" element={<Student />} exact />
          <Route path="/security" element={<Security />} exact />
          <Route path="/searchresult" element={<Searchresults />} exact />
          <Route path="/apply" element={<Apply />} exact />
          <Route path="/qr" element={<QrCode />} exact />
          <Route path="/qrscan" element={<QrScanner />} exact />
          <Route path="/history" element={<ViewHistory />} exact />
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
