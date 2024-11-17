import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Components/Common/Layout';
import Home from './Components/Home';
import PageNotFound from './Components/Common/PageNotFound';
import Login from './Components/Common/Login';
import RentalAgreements from './Components/RentalAgreements';
import AboutUs from './Components/Common/AboutUs';
import AddCar from './Components/AddCar';
import Car from './Components/Car';
import RentalAgreement from './Components/RentalAgreement';
import EditCar from './Components/EditCar';
import { CarProvider } from './Context/userCarContext';
import ProtectedRoute from './Components/Common/ProtectedRoute';
function App() {
  return (
    <>
      <Router>
        <CarProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="agreements" element={
                <ProtectedRoute>
                  <RentalAgreements />
                </ProtectedRoute>
              } />
              <Route path="agreement/:id" element={
                <ProtectedRoute>
                  <RentalAgreement />
                </ProtectedRoute>
              } />
              <Route path="car/:id" element={<Car />} />
              <Route path="add-car" element={
                <ProtectedRoute isAdmin={true}>
                  <AddCar />
                </ProtectedRoute>
              } />
              <Route path="edit-car/:id" element={
                <ProtectedRoute isAdmin={true}>
                  <EditCar />
                </ProtectedRoute>
              } />
              <Route path="about" element={<AboutUs />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </CarProvider>
      </Router>
    </>
  );
}

export default App;
