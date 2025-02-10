import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerList from './pages/customerList';
import CustomerAdd from './pages/customerAdd';
import CustomerEdit from './pages/customerEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={<CustomerList />}
          />
          <Route path="/add-customer" element={<CustomerAdd />} />
          <Route path="/edit-customer/:id" element={<CustomerEdit />} />
        </Routes>

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
