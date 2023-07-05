import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@');

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurhandler: firstNameBlurHandler,
    reset: resetFirstName
  } = useInput(isNotEmpty);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurhandler: lastNameBlurHandler,
    reset: resetLastName
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurhandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(isEmail);

  let formIsValid = false;
  
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Form submitted Successfully");
    resetFirstName();
    resetLastName();
    resetEmail();

  }

  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  
  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={enteredFirstName} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} />
          {firstNameHasError && <p className="error-text">Please enter a First Name</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={enteredLastName} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} />
          {lastNameHasError && <p className="error-text">Please enter a Last Name</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
