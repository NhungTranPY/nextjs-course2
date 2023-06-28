import { useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { headers } from 'next/dist/client/components/headers';

function NewsletterRegistration() {

  const emailInputRef = useRef()

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({email: enteredEmail}), // convert data to JSON, 'email' because in newsletter api we extract req.body.email
      headers: {
        'Content-Type': 'application/json',

      }
    })
      .then((response) => response.json)
      .then((data) => console.log(data))
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
