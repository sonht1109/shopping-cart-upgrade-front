import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import { api, apiToken } from './common/axios';
import Layout from './common/Layout';
import Loading from './components/Loading';
import Home from './pages/home/index';
import routes from './routes';
import * as constants from './common/constants'
import * as actions from './common/actions'
import NotFound from './pages/notFound/index';
import About from './pages/about';

function App() {
  
  const routeList = useMemo(() => (routes.map(item => item.path)), [])
  const appState = useSelector((state: any) => state.appReducer)
  const dispatch = useDispatch()
  
  //get categories and get user info
  useEffect(() => {
    let jwt = localStorage.getItem("jwt")

    api("GET", constants.GET_CATES_URL, null)
    .then(res => dispatch(actions.getCategories(res.data)))
    .then(() => {
      if(jwt){
        apiToken("GET", constants.GET_INFO_URL, null, jwt)
        .then(res => dispatch(actions.getUser(res.data)))
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))

  },[appState.isLogin])

  return (
    <Router>
      <Switch>
        <Route exact path={routeList}>
          <Layout/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
      <Loading active={appState.loading} />
    </Router>
  );
}

export default App;
