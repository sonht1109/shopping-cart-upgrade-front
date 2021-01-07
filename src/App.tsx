import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Layout from './common/Layout';
import Loading from './components/Loading';
import Home from './pages/home/index';
import routes from './routes';

type routes = [any]

function App() {
  
  const routeList = useMemo(() => (routes.map(item => item.path)), [])
  const appState = useSelector((state: any) => state.loading)

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
      <Loading active={appState.loading} />
    </Router>
  );
}

export default App;
