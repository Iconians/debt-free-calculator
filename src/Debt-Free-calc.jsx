import React from "react";
import PaymentList from "./paymentList";
import UiOutput from "./UiOutput";


class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      debt: '0', 
      interest: '9.5', 
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
     if (e.target.name === 'debt') {
      this.handleMinPyment()
     }
    
  };

  handlePayment = (e) => {
    e.preventDefault();
    const errorId = document.getElementById('message')
    const message = 'You must make atleast the minimum payment!';
    const minDue = this.state.minDue
    const newPayment = {
      number: this.state.number,
      id:Date.now()
    };
   if (newPayment === minDue) {
    this.setState((state) => ({
      payments: [...state.payments, newPayment],
      number: ''
    }))
   }
   else if (newPayment > minDue) {
    this.setState((state) => ({
      payments: [...state.payments, newPayment],
      number: ''
    }))
   }
   else {
    errorId.textContent = message;
    e.preventDefault();
   }
   

   
    this.handleMinPyment()
  }

  handleMinPyment = () => {
    const interest = this.state.interest
    const debtAmount = this.state.debt;
    const transfomInterest = (percent) => {
      return parseFloat(percent) / 100; 
    } 

    const calcInterest = () =>{
      return (
        Math.max((transfomInterest(interest) / 12 ) * debtAmount).toFixed(2)
      )
    }

    const parsedInerest = calcInterest()
    
    const calcPayment = () =>{
      return (
        Math.max(debtAmount * .01).toFixed(2)
      )
    }
       
    const minPay = calcPayment()
    const calcMinPay = (debt, interest) => {
    let debtAmount =  Math.max(debt)
    let interestRate = Math.max(interest)
      
      return (
       Math.max(debtAmount + interestRate).toFixed(2)
      )
    }  

    const minPayment = calcMinPay(minPay, parsedInerest)
  
    this.setState((state) => { 
      state.minDue = minPayment
    })
  };



  // handleMinPayment = () => {
  //   const debtAmount = this.state.debt
  //   console.log(debtAmount)

  //  
  // }

  // updateMinPayment = () => {
  //   const debt = this.handleMinPayment()
  //   const interest = this.handleInterest()
    
  //  

  // }

  // requireMin = () => {
  //   const debtAmount = this.state.debt;
    
  // const reqMin = (debtAmount * 0.01)
  // }


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
             <input style={{marginBottom: '10px'}}  onChange={this.handleChange} type="number" name="interest" value={this.state.interest} />
             <br />
             <label htmlFor="payment">make Payment</label>
             <br />
             <input style={{marginBottom: '10px'}} onChange={this.handleChange} type="number" name="number" value={this.state.number} />
             <br />
             <button>make payment</button>
             <p id="message"></p>
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