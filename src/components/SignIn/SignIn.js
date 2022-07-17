import React, { useState } from 'react';
import { validate } from 'email-validator';
import './SignIn.css';

export default function SignIn(props) {
  const [ userData, setUserData ] = useState({
    email: '',
    password: ''
  });
  const [ inputErrors, setInputErrors ] = useState({});
  const [ signInError, setSignInError ] = useState('');
   
  const { changeRoute, loadUser } = props;

  function updateUserData(event) {
    const { name, value } = event.target;

    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function validateInputs(userData) {
    const { email, password } = userData;
    const inputErrors = {};

    if (!email) {
      inputErrors.email = 'Email is required!';
    } else if (!validate(email)) {
      inputErrors.email = 'Not a valid email format!';
    }

    if (!password) {
      inputErrors.password = 'Password is required!';
    }

    setInputErrors(inputErrors);

    return inputErrors;
  }

  function handleSignInError(data) {
    setSignInError(data);
  }

  function handleSignIn() {
    const inputErrors = validateInputs(userData);
    const inputsAreValid = !Object.keys(inputErrors).length;

    if (inputsAreValid) {
      fetch('https://fra-server.herokuapp.com/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          changeRoute('home');
          loadUser(data);
          console.log('signIn log', data);
        } else {
          handleSignInError(data);
        }
      })
      .catch(console.log)
    } else {
      handleSignInError('');
      console.log('inputs not valid');
    }
  }

  function handleEnterKeypress(event) {
    if (event.key === 'Enter') {
      handleSignIn();
    }
  }

  return (
    <main className='signIn'>
      <form>
        <fieldset className='signIn-fieldset'>
          <legend className='signIn-title'>
            Sign  In
          </legend>
          <div className='signIn-inputs center f-column'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              id='email'
              type='email'
              value={userData.email}
              onChange={updateUserData}
              onKeyDown={handleEnterKeypress}
            />
            {inputErrors.email && <p className='error-message'>{inputErrors.email}</p>}
            <label htmlFor='password'>Password</label>
            <input 
              name='password'
              id='password' 
              type='password'
              value={userData.password}
              onChange={updateUserData}
              onKeyDown={handleEnterKeypress}
            />
            {inputErrors.password && <p className='error-message'>{inputErrors.password}</p>}
            {signInError && <p className='error-message'>{signInError}</p>}
          </div>
          <div className='signIn-buttons center f-column'>
            <p onClick={handleSignIn}>Sign In</p>
            <p onClick={() => changeRoute('register')}>Register</p>
          </div>
        </fieldset>
      </form>
    </main>
  )
}