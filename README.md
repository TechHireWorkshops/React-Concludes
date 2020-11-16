# React - Final Tips and Tricks

Now that you know the basics of React, you're ready to start building some apps of your own.  There's still lots to learn as you build more ambitious projects, and plenty of problems to overcome along the way.  Here's some of the common ones that you'll be running across.

## Modifying Parent State

In our previous lessons, we saw that components can have their own state, and can pass this state down in the form of props to child components.  While state can be changed, we cannot change the value of props without changing the original state that provides the props.

Let's look at a simple example of how we can achieve this.  We have a simple React app:


```
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NamePage from './NamePage';

function App() {
  	const [name, setName] = useState('');

  	const handleChange = e => {
   		const value = e.target.value;
    	setName(value);
  	};

  	return (
    	<div className='App'>
      		<NamePage 
      		name={name} 
      		handleChange={handleChange} />
    	</div>
  	);
}

export default App;
```

So far, we have a variable in state to save the users name, and a function, *handleChange*, to modify the value of name based on an input.  We also have a component called NamePage.

```
import React from 'react';

export default function NamePage({ name,
handleChange }) {
  	return (
    	<div>
      		<h1>Your name is {name}</h1>
      		<input type='text' value={name} 			onChange={handleChange} />
   		</div>
  	);
}

```

As we can see, this is where the name variable is being used, and this is where we have the input that the user uses to change the value of name.  While the value of the name variable is being stored in state in App, we are able to change it from within NamePage by passing down the function that changes the value of state as a prop, and attaching it to an input in the child component.

The page uses name as a prop, and can change the value of the prop coming in by changing the value of the state that provides that prop.

## PrevState

Usually, when we set state, we do so directly.  If we have a variable in state called counter, like so:

	const [counter, setCount] = useState(0)
	
and we want to update the value of counter to 1, we would usually do this:

	setCounter(1)
	
This works when we have a definite value in mind to update state to. What if we wanted to update state by *calculating a value based on the previous value of state?*

Say we want to increment our counter based on some user behavior.  We might try this

	const increment=()=>{
		setCounter(counter+1)
	}
	
If we try this, it seems to work.  The value of counter increments from 0 to 1, or 1 to 2, etc.  This isn't a safe method though.  What if we wanted to do this?

	const increment=()=>{
		for(let i = 0;i<10;i++{
			setCounter(counter+1)
		}
	}
	
Counter only increments by 1! This is because of how React handles state updates. React will often *batch* multiple state updates into a single update for performance reasons.  How do we fix this.  There are (at least) 2 ways.  We could do something like this:

	const increment=()=>{
		let newCounter = counter
		for(let i = 0;i<10;i++{
			newCounter+=1
		}
		setCounter(newCounter)
	}
	
Nothing wrong with that.  We do have another option though, that is more succinct.  It involves using setState in a new way.

We can pass a function into the setState method that returns a value to set to state.  This function naturally accepts a parameter that stands in for the previous value of the state value.  This parameter is usually called *prevState*.

	const increment=()=>{
		for(let i = 0;i<10;i++){
			setCounter((prevState)=>{
				return prevState+1
				}
			)
		}
	}
	
This ensures that React is updating the previous value of state each time.

## Forms

Forms are an important part of most websites, whether it's for logging in, writing comments, adding records, or many other things. It often involves the skills we covered above.  Let's look at an example of a simple login.

```
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';

function App() {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await loginFunction(loginInfo);
  };

  return (
    <div className='App'>
      <Login
        loginInfo={loginInfo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;

```

We see here that our App component has many of the necessary login features.  It has a loginInfo state object containing both the username and password, it has a handleChange function to save the login data that the user enters, and a handleSubmit function that runs some function when the user presses submit.  It takes the data from loginInfo and passes it to some function that interfaces with the back end and logs the user in.

Some notes on the handleChange function. There's some strange syntax on the first line of the function:

	const { name, value } = e.target;
	
As we'll see in the input elements below, each `<input/>` tag has a value, which is what is written in the element, and a name, which we use like a class or id to identify which input it is.  We use the line above to grab the name and value data from the input.

We can see that our setLoginInfo involves a new use of prevState.  Because either username or password is being entered at each time, we need to make sure that we don't lose the other one.  To do this, we use the previous version of state with prevState to make sure that we don't lose previous data, and then update it using 
	
	[name]: value
	
to write in the new value from the input in the appropriate place, which we select using the input name property.

We also need to pass down as props the loginInfo, as well as the 2 functions involved in login in to our Login component. Let's take a look at the Login Component

```
import React from 'react';

export default function Login({ loginInfo, handleChange, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={loginInfo.username}
          onChange={handleChange}
          placeholder='Username'
        />
        <input
          type='text'
          name='password'
          value={loginInfo.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <input type="submit" value="Log in!"/>
      </form>
    </div>
  );
}

```

This component is fairly straightforward.  We have some inputs inside of a form element, two of which are for updating username and password, and one for submitting the form.

Each of the text inputs has three necessary properties: name, value, and onChange. We also use placeholder to inform the user what each input is used for.

- Name: used to identify the input so that the handleChange function knows what to update.  This must have the same string as used in the loginInfo object.
- Value: We set this equal to the value in the loginInfo object that it is used to update to make sure that what is in state and what is displayed on the input remain identical.
- onChange: The event listener we use to update state when the input is typed into.

We also have a submit type input in the form that, when clicked, triggers the `onSubmit` listener in the form component.

Many of your forms will require customizations, but almost all with require a handleChange function that grabs the name and value from the input and updates the state form variable using prevState.  They will also likely include `<input/>` tags with name, value, and onChange properties.

## History

A small note here, but an important one.  We often want to change the view the user is on after running a function. In the login example above, we would probably want to route the user to a new page after logging in.  We do not want to use a `<Link>` tag on buttons or submit inputs that trigger other functions, as there's a high chance of losing data or sending users to pages that do not yet have the data they need to render without error.

In these cases, we use `history`, which is another method provided by react-router-dom.  If we modified our App component to use history on login submit, it would look like this:

```
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import {useHistory} from 'react-router-dom'

function App() {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const history=useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await loginFunction(loginInfo);
    history.push('/home')
  };
  
  ...
```

We import the `useHistory` hook from react-router-dom, we create an instance of history with the line

	  const history=useHistory();

and then we trigger a page change in the appropriate place with

	  history.push(NEW RELATIVE URL)

In this way, we can run a function, and after it has made the changes to our app we want, we can reroute the user to a new view.

## Good luck!

You've got a good foundation on building React apps.  There's lots still to learn, and the best way to do so is by picking a project you want to create and building it.  There are plenty of resources online for future learning, and you can always reach out to me with questions.  Good luck, and have fun!