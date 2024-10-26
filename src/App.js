import logo from './logo.svg';
import './App.css';
import ChatBot from "react-chatbotify";
import React from 'react';

function App() {
  const [form, setForm] = React.useState({});
	const formStyle = {
		marginTop: 10,
		marginLeft: 20,
		border: "1px solid #491d8d",
		padding: 10,
		borderRadius: 5,
		maxWidth: 300
	}

	const flow={
		start: {
			message: "Hello there! What is your name?",
			function: (params) => setForm({...form, name: params.userInput}),
			path: "ask_age"
		},
		ask_age: {
			message: (params) => `Nice to meet you ${params.userInput}, what is your age?`,
			function: (params) => setForm({...form, age: params.userInput}),
			path: "ask_car"
		},
		ask_car: {
			message: "Do you own any cars?",
			// alternative way to declare options, with sending of output disabled
			// more info here: https://react-chatbotify.com/docs/api/attributes
			// options: {items: ["Yes", "No"], sendOutput: false}
			options: ["Yes", "No"],
			chatDisabled: true,
			function: (params) => setForm({...form, car_ownership: params.userInput}),
			path: "ask_choice"
		},
		ask_choice: {
			message: "Select at least 2 cars that you like:",
			// alternative way to declare checkboxes, with default configurations (i.e. min 1, max 4, send output and not reusable)
			// more info here: https://react-chatbotify.com/docs/api/attributes
			// checkboxes: ["Dog", "Cat", "Rabbit", "Hamster"]
			checkboxes: {items: ["Dodge Challenger", "Mustang Shelby Cobra", "Skyline R34", "Lyken Hypersport"], min: 2},
			chatDisabled: true,
			function: (params) => setForm({...form, car_choices: params.userInput}),
			path: "ask_buy_intrest"
		},
		ask_buy_intrest: {
			message: "Do you fancy buying them?",
			function: (params) => setForm({...form, buy_intrest: params.userInput}),
			path: "end"
		},
		end: {
			message: "Thank you for your interest, we will get back to you shortly!",
			component: (
				<div style={formStyle}>
					<p>Name: {form.name}</p>
					<p>Age: {form.age}</p>
					<p>Pet Ownership: {form.car_ownership}</p>
					<p>Pet Choices: {form.car_choices}</p>
					<p>Num Work Days: {form.buy_intrest}</p>
				</div>
			),
			options: ["New Application"],
			chatDisabled: true,
			path: "start"
		},
	}
  return (
    <div className="App">
      <header className="App-header">
      <ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_basic_form"}}} flow={flow}/>
      </header>
    </div>
  );
}

export default App;
