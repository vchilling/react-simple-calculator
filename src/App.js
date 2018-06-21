import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TextBox} from './TextBox';
import {Button} from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: 'Number',
      placeholderResult: 'Result',
      textBoxNumbersClassName: 'input-box', 
      textBoxResultClassName: 'result-box',
      aDisabled: false,
      bDisabled: false,      
      aValue: '',
      bValue: '',
      resultValue: '',
      pattern: /^(-?\d*\.?\d*)$/,
      calcButtonWrapper: 'calculation-buttons', 
      resultWrapper: 'clear-button'
    }
    this.handleUserInputA = this.handleUserInputA.bind(this);
    this.handleUserInputB = this.handleUserInputB.bind(this);
    this.calculate = this.calculate.bind(this);    
    this.isInputMatchesPattern = this.isInputMatchesPattern.bind(this);
  }

  isInputMatchesPattern(newValue) {
     if (newValue.match(this.state.pattern)) { 
      return true;
     } else return false;
  }

  handleUserInputA(newValue) { 
    if (this.isInputMatchesPattern(newValue)) {
      this.setState({
        aValue: newValue
      });    
    }
  }
  handleUserInputB(newValue) { 
    if (this.isInputMatchesPattern(newValue)) {
      this.setState({
        bValue: newValue
      });
    }    
  }

  calculate(operation) {
    if ( (this.state.aValue.trim().length!==0) && (this.state.bValue.trim().length!==0) ){
      const a = parseFloat(this.state.aValue);
      const b = parseFloat(this.state.bValue); 
      switch(operation) {
        case 'add': return(
          this.setState({
            resultValue: (a + b)
          }) 
        );  
        case 'subtract': return(
           this.setState({
            resultValue: (a - b)
          })  
        );  
        case 'multiply': return(
          this.setState({
            resultValue: (a * b)
          }) 
        );  
        case 'divide': return(
          this.setState({
            resultValue: (a / b)
          }) 
        );  
        default : return (
          alert("Error!")     
        );     
      }
    } else {
      alert('Hey, both fields are mandatory :)');
    }  
  }
  
  clearFields() {
     this.setState({      
      aValue: '',
      bValue: '',
      resultValue: ''
    }) 
  }

  render() {
    let calcButtons = this.props.calcButtons.map((item, index) => {      
      return (       
          <Button value={item.value }                   
                  operation={item.operation}
                  onClick={ this.calculate.bind(this) } 
                  key={index}                  
                   />      
      );
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div id="calculator">
          <div className="inner">
            <h1>Simple calculator</h1>          
            <div>
              <TextBox textBoxClassName={this.state.textBoxNumbersClassName}  
                       placeholderText={this.state.placeholderText} 
                       disabled={this.state.aDisabled} 
                       value={ this.state.aValue } 
                       onChangeUserInput={this.handleUserInputA} />

              <TextBox textBoxClassName={this.state.textBoxNumbersClassName}  
                       placeholderText={this.state.placeholderText} 
                       disabled={this.state.bDisabled} 
                       value={ this.state.bValue } 
                       onChangeUserInput={this.handleUserInputB} />
            </div>
            <div className={this.state.calcButtonWrapper}>
              {calcButtons }
            </div>
             <div className={this.state.resultWrapper}>
              <TextBox textBoxClassName={this.state.textBoxResultClassName} 
                        placeholderText={this.state.placeholderResult}  
                        disabled="disabled" 
                        value={ this.state.resultValue }  />
              <Button  value='Clear' 
                        operation='clear'
                        onClick={ this.clearFields.bind(this) } />         
            </div>         
          </div>
        </div>
      </div>
    );
  }
}

export default App;
