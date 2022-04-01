import {React, useState, useRef} from 'react';
import Profile from './Profile';
import Login from './Login';

function AccountForm() {

  const userInput = useRef('');
  const userInputStreet = useRef('');
  const userInputState = useRef('');
  const userInputCountry = useRef('');
  const userInputZIP = useRef('');
  const userInputCOVID = useRef('');
  
  const [, setStarted] = useState(false);
  const start = useRef(false);
  const cloggedin = useRef(false);

  function handleUser(e)  {
    userInput.current = e.target.value;
  }

  function handleUserStreet(e)   {
    userInputStreet.current = e.target.value;
  }

  function handleUserState(e)  {
    userInputState.current = e.target.value;
  }

  function handleUserCountry(e)  {
    userInputCountry.current = e.target.value;
  }

  function handleUserZIP(e)  {
    userInputZIP.current = e.target.value;
  }

  function handleUserCOVID(e)  {
    userInputCOVID.current = e.target.value;
  }

  function handleFormSubmit(e) {
    if (/^[a-z0-9A-Z ]+$/.test(userInput.current)) {
        console.log(userInput);
        console.log(userInputStreet);
        console.log(userInputState);
        console.log(userInputCountry);
        console.log(userInputZIP);
        console.log(userInputCOVID);

        setStarted(true); 
        start.current = true;
    } else {
      alert("must fill all values properly and alphanumerically");
    }
  }
  function handleLogin(e) {
    setStarted(true); 
    cloggedin.current = true;
  }
  if (cloggedin.current) {
    return (
      <div className="Login">
      <Login />
      </div>
    );
  }
  if(!start.current || !cloggedin.current){
    return(
      <div>
        <h1>Enter Account Information</h1>
        <label>
          Full Name: <input name="user" onChange={handleUser}/>
        </label>
        <label>
          Street: <input name="street" onChange={handleUserStreet}/>
        </label>
        <label>
          State: <input name="state" onChange={handleUserState}/>
        </label>
        <label>
          Country: <input name="country" onChange={handleUserCountry}/>
        </label>
        <label>
          Zipcode: <input name="zip" onChange={handleUserZIP}/>
        </label>
        <label>
          COVID vaccination record: <input name="user" onChange={handleUserCOVID}/>
        </label>
        <button type="submit" onClick={handleFormSubmit}>Sign Up</button>
        <h1>Alrerady have an account? Login!</h1>
        <button type="submit" onClick={handleLogin}>Login</button>
      </div>
        )
  }
  return (
    <div className="Profile">
    <Profile />
    </div>
  );
}

export default AccountForm;
