import { Outlet, Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";


const Shop = () => {
  return (
    <div>
      <Outlet />
      <h1>Shop page</h1>
    </div>
  )
}

const Contact = () => {
  return (
    <div>
      <Outlet />
      <h1>Contact form</h1>
    </div>
  )
}

const Login = () => {
  return (
    <div>
      <Outlet />
      <h1>Login form</h1>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='contact' element={<Contact />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
