import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/layout/Navbar';
import MovieDetail from './pages/MovieDetail';
import { MovieProvider } from './context/MovieContext';
import Alert from './components/Alert';
import NotFound from './pages/NotFound';

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar />
        <div>
          <Alert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route path='/movie/:id' component={MovieDetail} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
