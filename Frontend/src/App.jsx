import CustomCursor from "/src/components/CustomCursor/CustomCursor.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import NavBar from "/src/components/NavBar/NavBar.jsx";
import Accommodation from "/src/pages/Accommodation/Accommodation.jsx";
import Competitions from "/src/pages/Competitions/Competitions.jsx";
import Nexus from "/src/pages/Nexus/Nexus.jsx";
import Events from "/src/pages/Events/Events.jsx";
import Home from "/src/pages/Home/Home.jsx";
import SocialCause from "/src/pages/Social Cause/SocialCause.jsx";
import Team from "/src/pages/Team/Team.jsx";
import Workshops from "/src/pages/Workshops/Workshops.jsx";
import AboutUs from "/src/pages/AboutUs/AboutUs.jsx";
import Zonals from "/src/pages/Zonals/Zonals.jsx";

// --- Carnival theme (2027) ---
import Landing from "/src/carnival/Landing.jsx";
import CarnivalAboutUs from "/src/carnival/AboutUsPage.jsx";
import CarnivalWorkshops from "/src/carnival/WorkshopsPage.jsx";
import CarnivalZonals from "/src/carnival/ZonalsPage.jsx";
import ComingSoon from "/src/carnival/ComingSoon.jsx";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/socials_icons/icons";
import "./App.css";
// random comment for deployment
import Form from "/src/components/Form/Form.jsx";

function App() {
  const lenis = useLenis(({ scroll }) => {});

  useEffect(() => {
    if (lenis) {
      lenis.options.lerp = 0.2;
      lenis.options.duration = 0.4;
    }
  }, [lenis]);

  return (
    <ReactLenis root>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route
            exact
            path="/"
            element={<Landing />}
          />
          <Route
            exact
            path="/events"
            element={<ComingSoon eyebrow="Step Right Up" title="Events" note="The competition line-up for this edition is being finalised. Check back shortly." />}
          />
          <Route
            exact
            path="/competitions"
            element={<CarnivalZonals />}
          />
          <Route
            exact
            path="/zonals"
            element={<CarnivalZonals />}
          />
          <Route
            exact
            path="/nexus"
            element={
              <>
                <NavBar />
                <Nexus />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/workshops"
            element={<CarnivalWorkshops />}
          />
          <Route
            exact
            path="/socialcause"
            element={
              <>
                <NavBar />
                <SocialCause />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/accommodation"
            element={
              <>
                <NavBar />
                <Accommodation />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/team"
            element={<CarnivalAboutUs />}
          />

          <Route
            exact
            path="/nexus-registration"
            element={
              <>
                <NavBar />
                <Form />
                <Footer />
              </>
            }
          />


          <Route
            exact
            path="/about"
            element={<CarnivalAboutUs />}
          />

          <Route
            exact
            path="/about-us"
            element={<CarnivalAboutUs />}
          />

          <Route
            exact
            path="/zonal-eliminations"
            element={<CarnivalZonals />}
          />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
