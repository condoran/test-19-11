import './App.css';
import Homepage from './Pages/homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
