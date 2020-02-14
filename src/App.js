import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/layout/Navbar';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar />
        <div className='container pt-4'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;