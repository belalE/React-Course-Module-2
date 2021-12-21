import React, { Component } from "react";
import classes from "./App.module.css";
// Instead of ejecting, I  can rename file to Person.module.css
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass"
import Aux from "../hoc/Aux"
import AuthContext from "../context/auth-context"



class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      persons: [
        { id: "a1231232", name: "John", age: 27 },
        { id: "b1232132", name: "Belal", age: 16 },
        { id: "c2312312", name: "Hamza", age: 20 },
        { id: "d1123123", name: "Moe", age: 9 },
        { id: "e123123231", name: "Joe", age: 11 },
      ],
      otherState: "some other value",
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("[getDerivedStateFromProps.js]", props, state);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate")
    return true;

  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }
  

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    const person = {
      ...this.state.persons[personIndex],
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {persons: persons, changeCounter: prevState.changeCounter + 1}
    });
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log("[App.js] render")
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
          />
        </div>
      );

    }
    

    return (
      <Aux>
        <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}} >
        {this.state.showCockpit ? 
        <Cockpit title={this.props.appTitle} showPersons={this.state.showPersons} personsLength={this.state.persons.length} clicked={this.togglePersonsHandler}/> : null }
        {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
