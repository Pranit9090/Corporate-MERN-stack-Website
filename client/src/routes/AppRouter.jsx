// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";

// Pages
import Dashboard from "../pages/Dashboard";
import Arithmetic from "../pages/Arithmetic";
import VerbalAbility from "../pages/VerbalAbility";
import LogicalReasoning from "../pages/LogicalReasoning";
import VerbalReasoning from "../pages/VerbalReasoning";
import NonverbalReasoning from "../pages/NonverbalReasoning";
import DsaSheets from "../pages/DsaSheets";
import DsaTracker from "../pages/DsaTracker";
import Jobs from "../pages/Jobs";
import Profile from "../pages/Profile";
import ContactUs from "../pages/ContactUs";
import MockInterview from "../pages/MockInterview";
import ResumeBuilder from "../pages/ResumeBuilder";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import DataInterpretation from "../pages/DataInterp";
import SubtopicPage from "../pages/SubtopicPage";
import Apply from "../pages/Apply";
import MyJobs from "../pages/MyJobs";
import MyResume from "../pages/MyResume";
import PaymentPage from "../pages/PaymentPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages are wrapped inside Layout (Sidebar + Navbar) */}
        <Route path="/" element={<Layout />}>
          {/* Redirect base URL to /dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Aptitude */}
          <Route path="arithmetic" element={<Arithmetic />} />
          <Route path="data-interpretation" element={<DataInterpretation />} />
          <Route path="verbal-ability" element={<VerbalAbility />} />
          <Route path="logical-reasoning" element={<LogicalReasoning />} />
          <Route path="verbal-reasoning" element={<VerbalReasoning />} />
          <Route path="nonverbal-reasoning" element={<NonverbalReasoning />} />

          {/* Coding & Interviews */}
          <Route path="dsa-sheets" element={<DsaSheets />} />
          <Route path="dsa-tracker" element={<DsaTracker />} />

          {/* More */}
          <Route path="jobs" element={<Jobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/apply/:jobId" element={<Apply />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/my-resume" element={<MyResume />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Catch-All 404 */}
          <Route path="*" element={<h2 className="p-6">Page not found</h2>} />
          <Route path="/:topic/:slug" element={<SubtopicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
