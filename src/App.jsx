import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";

import Home from './Components/Home/Home'
import UserD from './Components/users_dashboard/UserD'
import VehicleD from './Components/Vehicle_dashboard/VehicleD'
import NavbarOutlet from './Components/Navbar/NavbarOutlet'
import Contact from './Components/Navbar/Pages/Contact'
import About from './Components/Navbar/Pages/About'
import Safety from './Components/Navbar/Pages/Safety'
import Press from './Components/Navbar/Pages/Press'
import Careers from './Components/Navbar/Pages/Careers'
import HomeInPage from './Components/Navbar/Pages/HomeInPage';
import SearchDataHere from './Components/users_dashboard/SearchDataHere';
import Navbar from './Components/Navbar/Navbar';
import MoreAbout from './Components/Navbar/Pages/MoreAbout';
import SafetyCustomers from './Components/Navbar/Pages/SeftyOverviews/SafetyCustomers';
import SafetyOverview from './Components/Navbar/Pages/SeftyOverviews/SafetyOverview';
import SafetyOwners from './Components/Navbar/Pages/SeftyOverviews/SafetyOwners';
import ViewJobs from './Components/Navbar/Pages/ViewJobs';
import Join from './Components/users_dashboard/Earn/Join';

function App() {
  return (
    <>
      <Routes>

        {/* Layout with Navbar */}


        {/* Home */}
        <Route index element={<Home />} />

        {/* Dashboards */}
        <Route path="/" element={<NavbarOutlet />}>
          <Route path="/userD" element={<UserD />} />
          <Route path="/searchdata" element={<SearchDataHere />} />
          <Route />
        </Route>

        <Route path="/" element={<NavbarOutlet />}>
          {/* Pages */}
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path='/viewjob' element={<ViewJobs />} />
          <Route path="/join" element={<Join />} />
          <Route path="/MoreAbout" element={<MoreAbout />} />
          <Route path="safety" element={<Safety />} />
          <Route path="/SafetyCustomers" element={<SafetyCustomers />} />
          <Route path="/SafetyOverview" element={<SafetyOverview />} />
          <Route path="/SafetyOwners" element={<SafetyOwners />} />
          <Route path="press" element={<Press />} />
          <Route path="careers" element={<Careers />} />


        </Route>
        <Route path="/VehicleD" element={<VehicleD />} />
        {/* fallback */}
        {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}

      </Routes>
    </>
  )
}

export default App