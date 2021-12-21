import React, { Component } from "react";
// can use React.Fragment instead of Aux
import PropTypes from "prop-types";
import Aux from "../../../hoc/Aux"
import withClass from "../../../hoc/withClass"
import classes from "./Person.module.css";
import AuthContext from "../../../context/auth-context"
// Instead of ejecting, I  can rename file to Person.module.css

class Person extends Component  {

  constructor(props) {
    super(props)
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus()
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated)
  }

  render() {
    console.log("[Person.js] rendering")
    return (
      <Aux>
      <p>{this.context.authenticated ? "authenticated!" : "Please login"}</p>
      
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p> 
        <p>{this.props.children}</p>
        <input 
        type="text"
          // ref={(inputEl) => {this.inputElement = inputEl;}}
          ref={this.inputElementRef}
          onChange={this.props.changed} 
          value={this.props.name} />
      </Aux>
    );
  }
};

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);