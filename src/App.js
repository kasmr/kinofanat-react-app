import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/layout/Navbar';
import MovieDetail from './components/movieInfo/MovieDetail';
import { MovieProvider } from './context/MovieContext';
import Alert from './components/Alert';
import NotFound from './pages/NotFound';
import Screenshots from './components/movieInfo/Screenshots';

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
            <Route exact path='/movie/:id' component={MovieDetail} />
            <Route path='/movie/:id/screenshots' component={Screenshots} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
