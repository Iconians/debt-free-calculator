import React from "react";
import PaymentList from "./paymentList";
import UiOutput from "./UiOutput";


class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      debt: 0, 
      interest: 9, 
      number: 0,
      paymentAmount: 0, 
      payments: [], 
      amountOfPayment: 0, 
      minDue: 0,
      interestAmount: 0,
    };
  };
 
  handleChange = (e) => {
     if (e.target.name === 'debt') {
      this.edgeCase(e.target.value, this.state.interest)
      this.numberOfPayments()
    }
    else if (e.target.name === 'interest') {
      this.edgeCase(this.state.debt,e.target.value)
      this.numberOfPayments()
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
    
  };

 edgeCase = (debt, interest) => {
  const interger1 = parseInt(debt)
  const interestAmount = interest
  if (interger1 === 100) {
   this.handleEdgeCase(interger1)
  }
  else if (interger1 < 100) {
   this.handleEdgeCase(interger1)  
  }
  else {
    this.handleMinPayment(interger1, interestAmount)
  }
  
 };

 
  handleEdgeCase = (debt) => {
  const calcEdgeCase = (debt, interest) => {
    const interger1 = parseFloat(debt)
    const interger2 = parseFloat(interest)
    return (
      Math.abs(interger1 + interger2).toFixed(2)
    )
  }

    const calc =  Math.max(debt * .01).toFixed(2)

    const addInterest = calcEdgeCase(debt, calc)
    
    this.setState({minDue: parseFloat(addInterest)});
  }
   
  
  handlePayment = (e) => {
    e.preventDefault();
    const errorId = document.getElementById('message')
    const message = 'You must make atleast the minimum payment!';
    const minDue = this.state.minDue;

    const newPayment = {
      number: this.state.number,
      id:Date.now()
    };
  
    const reguireMin = (payment, minDue) => {
      const debtAmount = this.state.debt
      const interest = this.state.interest
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
          errorId.textContent = ''
          this.setState((state) => ({
           payments: [...state.payments, newPayment],
           debt: parseFloat(newBal),
           makePayment: 0
         }))
         this.handleMinPayment(newBal, interest)
         this.numberOfPayments()
        }
        else if (payment === minDue) {
          errorId.textContent = ''
          this.setState((state) => ({
           payments: [...state.payments, newPayment],
           debt: parseFloat(newBal),
           makePayment: 0
         }))
         this.handleMinPayment(newBal, interest)
         this.numberOfPayments()
        }
        else {
         errorId.textContent = message;
         e.preventDefault();
        }
      }

      const requireEdgeCaseMin = (payment, minPay) => {
        if (payment === minPay) {
          errorId.textContent = ''
          this.setState((state) => ({
           payments: [...state.payments, newPayment],
           debt: 0,
           makePayment: 0
         }))
        }
        else {
          errorId.textContent = message;
          e.preventDefault();
        }
      }
  
      if (minDue < 102) {
        requireEdgeCaseMin(parseFloat(newPayment.number), minDue)
      }
      else {
        reguireMin(newPayment.number, minDue)
      }
    }

    handleMinPayment = (debtAmount, interest) => {
      const interestAmount = interest
  
      const transfomInterest = (percent) => {
        return parseFloat(percent) / 100; 
      } 

      const calcInterest = () => {
        return (
          Math.max((transfomInterest(interestAmount) / 12 ) * debtAmount).toFixed(2)
        )
      }

      const parsedInterest = calcInterest()
      
      const calcPayment = () => {
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
        Math.abs(debtAmount / minDue).toFixed(0)
      )
     }
  
     const amountPayments = divideDebt(debtAmount, minDue)
  
     this.setState((state) => {
       state.amountOfPayment = amountPayments
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
               <input style={{marginBottom: '10px'}} placeholder='0' onChange={this.handleChange} type="text" name="debt" value={this.state.debt}/>
               <br />
               <label htmlFor="interest">Interest Rate</label>
               <br />
               <input style={{marginBottom: '10px'}} placeholder='9.5' onChange={this.handleChange} type="text" name="interest" value={this.state.interest} />
               <br />
               <label htmlFor="payment">make Payment</label>
               <br />
               <input style={{marginBottom: '10px'}} id='MinPayInput' placeholder='0' onChange={this.handleChange} type="text" name="number" value={this.state.number} />
               <br />
               <button>make payment</button>
               <p style={{fontSize: '15px'}} className="valid" id="message" ></p>
              </form>
              <PaymentList payments={this.state.payments} />
            </div>
            <div>
              <UiOutput balance={this.state.debt} interest={this.state.interest} amountOfPayment={this.state.amountOfPayment} minimalDue={this.state.minDue} />  
            </div>
          </div>
        </div>
      )
  }
}

export default Calculator;