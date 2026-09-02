import {Routes,Route} from 'react-router-dom';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatorDashboard from "./pages/CreatorDashboard";
import Campaigns from "./pages/Campaigns";
import CreatorProfile from "./pages/creatorProfile";
import ProtectedRoute from './components/ProtectedRoute';
import BrandDashboard from './pages/BrandDashBoard';
import CreateCampaign from './pages/create-campaign';
import CampaignDetails from "./pages/CampaignDetails";
function App(){
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
<Route path="/campaigns" element={<Campaigns />} />
<Route path="/CreateCampaign" element={<CreateCampaign />} />
import CampaignDetails from "./pages/CampaignDetails";

<Route
  path="/campaign/:campaignId"
  element={
    <ProtectedRoute>
      <CampaignDetails />
    </ProtectedRoute>
  }
/>

      <Route path="/creator-profile"
       element={
       <ProtectedRoute>
        <CreatorProfile /> 
        </ProtectedRoute>
}
/>
      <Route path="/creator-dashboard" element=
      {<ProtectedRoute>
      <CreatorDashboard />
      </ProtectedRoute>
      }
      />
<Route path="brand-dashboard" element={
  <ProtectedRoute>
    <BrandDashboard />
</ProtectedRoute>
}
/>
    </Routes>
  )
}


export default App;