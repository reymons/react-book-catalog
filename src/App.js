import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { auth } from "./firebase";
import { useEffect, useState } from 'react';
import { AuthContext } from "./contexts";
import Books from './components/Books';
import BookProvider from './contexts/BookContext';
import Manage from './components/Manage';

const App = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setLoading(false);
      setUser(user);
    })
  }, []);

  const value = {
    user
  }

  return (
    <Router>
      {
        !loading &&
        <AuthContext.Provider value={value}>         
          <Header />
          <div id="page">
            <Switch>
              
              <BookProvider>
                <Route exact path={process.env.PUBLIC_URL + "/"} component={Books} />
                <Route path="/manage" component={Manage} />
              </BookProvider>
            </Switch>
          </div>
        </AuthContext.Provider>
      }
    </Router>
  )
}

export default App;
