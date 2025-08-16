import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import EligibilityCheck from './components/EligibilityCheck';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/Login';
import Appointment from './components/Appointment'; // <-- Import Appointment
import Profile from './components/Profile';
import DonorDashboard from './components/DonorDashboard';
import './index.css';
import ManageAppointments from './components/ManageAppointments';
import UrgentRequests from './components/UrgentRequest';
import Badges from './components/Badges';
import DonationCenters from './components/DonationCenters';
import Chat from './components/Chat';
import AdminChat from './components/AdminChat';
import FeedbackForm from './components/Feedbackform';
import Resources from './components/Resources';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/eligibility" element={<EligibilityCheck />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/appointments" element={<Appointment />} /> 
            <Route path="/profile" element={<Profile/>} />
            <Route path="/donor/dashboard" element={<DonorDashboard/>} />
            <Route path="/book-appointment" element={<Appointment/>} />
            <Route path='/manage-appointments' element={<ManageAppointments/>}/>
            <Route path="/UrgentRequest" element={<UrgentRequests/>}/>
            <Route path="/badges" element={<Badges/>}/>
            <Route path="/donationcenter" element={<DonationCenters/>}/>
            <Route path="/chatwithcenter" element={<Chat/>}/>
            <Route path="/adminchat" element={<AdminChat/>}/>
            <Route path="/feedback/:appointmentId" element={<FeedbackForm />} />
            <Route path="/resources" element={<Resources/>}/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;