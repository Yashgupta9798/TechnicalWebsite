import {BrowserRouter, Routes,Route} from "react-router-dom";
import {Home} from "./pages/Home"
import {About} from "./pages/About"
import {Contact} from "./pages/Contact"
import {Service} from "./pages/Service";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {Navbar} from "./components/Navbar"
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import {Logout} from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout"; // for the admin page
import { AdminUsers } from "./pages/Admin-Users";//for the admin>>to get all the users
import { AdminContacts } from "./pages/Admin-Contacts";// for the admin >> to get all the contacts

const App = () => {
  return <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/Service" element={<Service />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="*" element={<Error />}/>

        {/* making a nested loop */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} /> {/**for nested loop>> admin/users */}
          <Route path="contacts" element={<AdminContacts />} /> {/**for nested loop>> admin/users */}
        </Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
}

export default App;