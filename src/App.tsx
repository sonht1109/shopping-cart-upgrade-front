import { useMemo } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Layout from './common/Layout';
import Home from './pages/home/index';
import routes from './routes';

type routes = [any]

function App() {
  
  const routeList = useMemo(() => (routes.map(item => item.path)), [])

  return (
    <Router>
      <Switch>
        <Route exact path={routeList}>
          <Layout/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
