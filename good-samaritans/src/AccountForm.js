
import {React, useState, useRef} from 'react';


function AccountForm() {

  const userInput = useRef();
  const userInputStreet = useRef();
  const userInputState = useRef();
  const userInputCountry = useRef();
  const userInputZIP = useRef();
  const userInputCOVID = useRef();

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
    e.preventDefault();
    if (/^[a-z0-9A-Z ]+$/.test(userInput.current)) {
        console.log(userInput);
        console.log(userInputStreet);
        console.log(userInputState);
        console.log(userInputCountry);
        console.log(userInputZIP);
        console.log(userInputCOVID);
    } else {
      alert("must fill all values properly and alphanumerically");
    }
  }

  return(
    <div>
          <h1>Enter Account Information</h1>
          <form onSubmit={handleFormSubmit}>
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
          <button type="submit">Sign Up</button>
        </form>
    </div>
      )

}

export default AccountForm;
