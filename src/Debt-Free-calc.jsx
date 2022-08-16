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
      minDue: '0',
      interestAmount: '0',
    };
  }
 
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
     if (e.target.name === 'debt') {
      this.handleMinPyment()
      this.numberOfPayments()
    }
    else if (e.target.name === 'interest')
    this.numberOfPayments()
    
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
  
    const regMin = (payment, minDue) => {
      const debtAmount = this.state.debt
      const interestAmount = this.state.interestAmount

      const subtractPrinciple = () => {
        return (
          Math.max(payment - interestAmount).toFixed(2)
        )
      }
        
      const updatedebt = (debt, payment) => {
          return (
          Math.abs(debt - payment).toFixed(2)
          )    
        }

        const dividePrinciple = subtractPrinciple()

        const newBal = updatedebt(debtAmount, dividePrinciple)

        if (payment > minDue) {
         this.setState((state) => ({
           payments: [...state.payments, newPayment],
           debt: newBal,
           number: ''
         }))
         this.handleMinPyment()
         this.numberOfPayments()
        }
        else if (payment === minDue) {
         this.setState((state) => ({
           payments: [...state.payments, newPayment],
           debt: newBal,
           number: ''
         }))
         this.handleMinPyment()
         this.numberOfPayments()
        }
        else {
         errorId.textContent = message;
         e.preventDefault();
        }
      }
      regMin(newPayment.number, minDue)

   
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

    const parsedInterest = calcInterest()
    
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

    const minPayment = calcMinPay(minPay, parsedInterest)
  
    this.setState((state) => { 
      state.minDue = minPayment
      state.interestAmount = parsedInterest
    })
  };

  numberOfPayments = () => {
   const debtAmount = this.state.debt;
   const minDue = this.state.minDue;

   const divideDebt = (debtAmount, minDue) => {
    return (
      Math.round(debtAmount / minDue).toFixed(1)
    )
   }

   const amountPayments = divideDebt(debtAmount, minDue)

   this.setState((state) => {
     state.amountOfPayment = amountPayments
   })
    
  }

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