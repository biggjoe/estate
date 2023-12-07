import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import SettingsHome from "./SettingsHome";
import SettingsFaq from "./Faq/SettingsFaq";
import SettingsSite from "./Site/SettingsSite";
import SettingsPages from "./Pages/SettingsPages";

export default function SettingsPage() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<SettingsHome />} />
        <Route path="*" element={<SettingsHome />} />
        <Route path="/pages/*" element={<SettingsPages />} />
        <Route path="/faq/*" element={<SettingsFaq />} />
        <Route path="/site/*" element={<SettingsSite />} />
      </Routes>
    </React.Fragment>
  );
}
