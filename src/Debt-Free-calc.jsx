import React from "react";
import PaymentList from "./paymentList";
import UiOutput from "./UiOutput";

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      debt: '0', 
      interest: '9.5%', 
      number: '0', 
      payments: [], 
      amountOfPayment: '0', 
      minDue: '0'
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (this.state.debt > '0') {
      return (
        this.handleInterest()
      )
    }
  };

  handlePayment = (e) => {
    e.preventDefault();

    const newPayment = {
      number: this.state.number,
      id:Date.now()
    };

      // const reqMin = (debtAmount * 0.01)

    
    this.setState((state) => ({
      payments: [...state.payments, newPayment],
      number: ''
    }))
  }

  handleInterest = () => {
    const interest = this.state.interest
    const debtAmount = this.state.debt
    let transfomInterest = parseFloat(interest)
    let calcInterest = Math.abs((transfomInterest / 12 ) * debtAmount).toFixed(2); 
    
   this.setState((state) => {
    state.minDue = calcInterest
   })
  };


  render() {
    return(
     
     <div>
        <h1>Debt Free Calculator</h1>
        <div style={{display: 'flex'}}>
          <div style={{padding: '40px'}}>
            <form onSubmit={this.handlePayment}>
             <label htmlFor="debtAmount">Total Debt Amount</label>
             <br />
             <input style={{marginBottom: '10px'}} onChange={this.handleChange} type="text" name="debt" value={this.state.debt}/>
             <br />
             <label htmlFor="interest">Interest Rate</label>
             <br />
             <input style={{marginBottom: '10px'}}  onChange={this.handleChange} type="text" name="interest" value={this.state.interest} />
             <br />
             <label htmlFor="payment">make Payment</label>
             <br />
             <input style={{marginBottom: '10px'}} onChange={this.handleChange} type="text" name="number" value={this.state.number} />
             <br />
             <button>make payment</button>
            </form>
          </div>
          <div>
            <UiOutput balance={this.state.debt} interest={this.state.interest} amountOfPayment={this.state.amountOfPayment} minimalDue={this.state.minDue} />
            <PaymentList payments={this.state.payments} />
          </div>
        
        </div>
        
        
      </div>
    )
  }

}

export default Calculator;