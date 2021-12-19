import React, { Component } from "react";
import classes from "./App.css";
// Instead of ejecting, I  can rename file to Person.module.css
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";



class App extends Component {
  state = {
    persons: [
      { id: "a1231232", name: "John", age: 27 },
      { id: "b1232132", name: "Belal", age: 16 },
      { id: "c2312312", name: "Hamza", age: 20 },
      { id: "d1123123", name: "Moe", age: 9 },
      { id: "e123123231", name: "Joe", age: 11 },
    ],
    otherState: "some other value",
    showPersons: false,
  };

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

    this.setState({
      persons: persons,
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

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
        </div>
      );

    }
    

    return (
      <div className={classes.App}>
        <Cockpit showPersons={this.state.showPersons} persons={this.state.persons} clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;
