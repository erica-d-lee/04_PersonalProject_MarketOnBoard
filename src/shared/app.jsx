import React, { useEffect } from 'react';
import './app.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import GoodsList from '../pages/goodsList';
import LogIn from '../pages/logIn';
import SignUp from '../pages/signUp';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { apiKey } from './firebase';
import Permit from './permit';
import Post from '../pages/post';
import Detail from '../pages/detail';
import NotFound from '../pages/notFound';

function App() {
  const dispatch = useDispatch();
  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(session_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Permit>
          <Route path='/' exact component={GoodsList} />
          <Route path='/post' component={Post} />
          <Route path='/good/:goodId' exact component={Detail} />
          <Route path='/good' exact component={NotFound} />
        </Permit>
        <Route path='/login' exact component={LogIn} />
        <Route path='/signup' component={SignUp} />
        {/* <Route component={NotFound} /> */}
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
