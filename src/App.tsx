import { useMemo } from 'react';
import {Route, Router, Switch} from 'react-router-dom'
import './App.css';
import Layout from './common/Layout';
import Home from './pages/home/index';
import routes from './routes';

function App() {
  
  const routeList = useMemo(() => (routes.map(item => item.path)), [])

  return (
    // <Router>
    //   <Switch>
    //     <Route exact path={routeList}>

    //     </Route>
    //   </Switch>
    // </Router>
    <div className="App">
      {/* <Home /> */}
      <Layout/>
    </div>
  );
}

export default App;
