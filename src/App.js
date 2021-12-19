import React, { Component } from "react";
import classes from "./App.css";
// Instead of ejecting, I  can rename file to Person.module.css

import Person from "./Person/Person";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";



class App extends Component {
  state = {
    persons: [
      { id: "asdasd", name: "John", age: 27 },
      { id: "asdasfhsgsdfg", name: "Belal", age: 16 },
      { id: "rydxtyguhiopl", name: "Hamza", age: 20 },
      { id: "m,nbhjg", name: "Moe", age: 9 },
      { id: "rtfygui", name: "Joe", age: 11 },
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
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (<ErrorBoundary key={person.id}>
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              /></ErrorBoundary>
            );
          })}
        </div>
      );
    btnClass = classes.Red;

    }
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a react app</h1>
        <p className={assignedClasses.join(" ")}>This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
