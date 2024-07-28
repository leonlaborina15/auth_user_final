
import "./App.css";
import Signup from "./components/signup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/login";
import Home from "./components/home";


function App() {
   return (
       <Router>
           <Routes>
               <Route path="/signup" element={<Signup />} />
               <Route path="/login" element={<Login />} />
               <Route path="/" element={<Home />} />
           </Routes>
       </Router>
   );
}

export default App;
