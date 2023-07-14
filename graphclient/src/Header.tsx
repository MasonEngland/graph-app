import './header.css'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { State } from './State/reducers/rooter-reducer';
import { useState, useEffect } from 'react';


//todo: fix css for the display message
export default function Header() {
  
  // use selector refers to a reducer which pulls from the store
  // the store contains auth and userData
  //! please correct any errors in my comments
  const state : any = useSelector((state : State) => state.auth)
  const [message, setMessage] = useState("please sign in");

  useEffect(() => {
    if (state.currentUser) setMessage(state.currentUser.email);
  }, [state])

  return (
      <header className="navigationContainer">
        <nav>
          <div className="navDisplay">
            <h2>Grapher.IO <span>{message}</span></h2>
          </div>
        </nav>
      </header>
  );
};
  