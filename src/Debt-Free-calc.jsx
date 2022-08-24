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
 
  handleChange = ({target: {name, value}}) => {
    if (name === 'debt' || name === 'interest') {
      const params = name === 'debt' ? [value, this.state.interest] : [this.state.debt, value];
      this.edgeCase(params[0], params[1])
      this.numberOfPayments(params[0], params[1])
    }
    this.setState({
      [name]: value,
    })
  };

 edgeCase = (debt, interest) => {
  const interger1 = parseFloat(debt)
  const interestAmount = interest
  if (interger1 <= 100) {
   this.handleEdgeCase(interger1)
  }
  else {
    this.handleMinPayment(interger1, interestAmount)
  } 
 };

 calcEdgeCase = (debt, interest) => {
  const interger1 = parseFloat(debt)
  const interger2 = parseFloat(interest)
  return (
    Math.abs(interger1 + interger2).toFixed(2)
  )
};

  handleEdgeCase = (debt) => {
    const calc =  Math.max(debt * .01).toFixed(2)
    const addInterest = this.calcEdgeCase(debt, calc)
    this.numberOfPayments()
    this.setState({minDue: parseFloat(addInterest)});
  };

  subtractPrinciple = (payment, interestAmount) => {
    return (
      Math.max(payment - interestAmount).toFixed(2)
    )
  };

  updatedebt = (debt, payment) => {
    return (
      Math.abs(debt - payment).toFixed(2)
    )  
  };

  reguireMin = (minDue, newPayment, e) => {
    const debtAmount = this.state.debt
    const interest = this.state.interest
    const payment = newPayment.number 
    const interestAmount = this.state.interestAmount
    const dividePrinciple = this.subtractPrinciple(payment, interestAmount)
    const newBal = this.updatedebt(debtAmount, dividePrinciple)
    const errorId = document.getElementById('message')
    const message = 'You must make atleast the minimum payment!';
    if (parseFloat(payment) >= minDue) {
      errorId.textContent = ''
      this.setState((state) => ({
      payments: [...state.payments, newPayment],
      debt: parseFloat(newBal),
      number: '',
      makePayment: 0
     }))
     this.edgeCase(newBal, interest)
     this.numberOfPayments(newBal, interest)
    }
    else {
     errorId.textContent = message;
     e.preventDefault();
     
    }
  };

  calcPayOff = (debt) => {
    const interestAmount = this.state.interest
    const parsedInterest = this.calcInterest(debt, interestAmount)
    return (
      Math.max(debt + parseFloat(parsedInterest)).toFixed(2)
    )
  }

  paymentCap = (debt, newPayment, e) => {
    const errorId = document.getElementById('message')
    const payment = parseFloat(newPayment.number) 
    const payOff = this.calcPayOff(debt)
    const message = 'You cannot pay more then the debt owed!';
    const errorMessage = `to pay debt off you need to pay ${payOff}`
    if (payment > payOff ) {
      errorId.textContent = message
      e.preventDefault()
    }
    else if (payment === parseFloat(payOff)) {
      errorId.textContent = ''
      this.setState((state) => ({
        payments: [...state.payments, newPayment],
        number: '',
        debt: 0,
        makePayment: 0,
        minDue: 0,
        amountOfPayment: 0
      }))
    }
    else {
      errorId.textContent = errorMessage
      e.preventDefault()
    }
  };
  
  handlePayment = (e) => {
    e.preventDefault()
    const debt = parseFloat(this.state.debt)
    const minDue = this.state.minDue;
    const newPayment = {
      number: this.state.number,
      id:Date.now()
    };
    if (debt <= 100) {
      this.handleEdgeCase(debt)
      this.requireEdgeCaseMin(minDue, newPayment)
      
    }
    else if (debt <= newPayment.number) {
      this.paymentCap(debt, newPayment)
    }
    else {
      this.reguireMin(minDue, newPayment)
    }
  };

  requireEdgeCaseMin = (minPay, newPayment, e) => {
    const errorId = document.getElementById('message')
    const message = 'You must make atleast the minimum payment!';
    const capMessage = 'You cannot pay more then the minimum payment!';
    const payment = parseFloat(newPayment.number)
    if (payment === minPay) {
      errorId.textContent = ''
      this.setState((state) => ({
        payments: [...state.payments, newPayment],
        number: '',
        debt: 0,
        makePayment: 0,
        minDue: 0,
        amountOfPayment: 0
     }))
    }
    else if (payment > minPay) {
      errorId.textContent = capMessage;
      e.preventDefault();
    }
    else {
      errorId.textContent = message;
       e.preventDefault();
    }
  };

  transfomInterest = (percent) => {
    return parseFloat(percent) / 100; 
  }; 
  calcInterest = (debtAmount, interestAmount) => {
    return (
      Math.max((this.transfomInterest(interestAmount) / 12 ) * debtAmount).toFixed(2)
    )
  };
  calcPayment = (debtAmount) => {
    return (
      Math.max(debtAmount * .01).toFixed(2)
    )
  };

  calcMinPay = (debt, interest) => {
    let debtAmount =  Math.max(debt)
    let interestRate = Math.max(interest)       
    return (
      Math.max(debtAmount + interestRate).toFixed(2)
    )
  }; 

  handleMinPayment = (debtAmount, interest) => {
    const interestAmount = interest
    const parsedInterest = this.calcInterest(debtAmount, interestAmount)  
    const minPay = this.calcPayment(debtAmount)
    const minPayment = this.calcMinPay(minPay, parsedInterest)
    if (isNaN(minPayment)) {
      this.setState((state) => { 
        state.minDue = 0
      })
    }
    else {
      this.setState((state) => { 
        state.minDue = minPayment
        state.interestAmount = parsedInterest
      })
    }
  };

  divideDebt = (debtAmount, minDue) => {
    return (
      Math.abs(debtAmount / minDue).toFixed(0)
    )
  };

  numberOfPayments = (debt, interest) => {
    const parsedDebt = parseFloat(debt); 
    const parsedInterest = this.calcInterest(parsedDebt, interest); 
    const minPay = this.calcPayment(debt);
    const minPayment = this.calcMinPay(minPay, parsedInterest);   
    if (isNaN(parseFloat(minPayment))) {
      this.setState((state) => {
        state.amountOfPayment = 0
      })
    }
    else if (parsedDebt <= 100) {
      this.setState((state) => {
        state.amountOfPayment = 1
      })
    }  
    else {
      const amountPayments = this.divideDebt(parsedDebt, minPayment)
      this.setState((state) => {
        state.amountOfPayment = amountPayments
      })
    }
  };

  render() {

    const inputs = [
      {
        label: 'Total Debt Amount',
        placeholder: '0',
        name: 'debt'
      },
      {
        label: 'Interest Rate',
        placeholder: '9.5',
        name: 'interest'  
      },
      {
        label: 'Make Payment',
        placeholder: '0',
        name: 'number',
        id: 'minPayInput'
      }
    ];

    return(
     
      <div>
        <h1>Debt Free Calculator</h1>
        <div style={{display: 'flex'}}>
          <div style={{padding: '40px'}}>
            <form onSubmit={this.handlePayment}>
              {inputs.map(input => {
                const {label, placeholder, name} = input
                return (
                <>
                  <label htmlFor={name}>{label}</label>
                  <br />
                  <input 
                    style={{marginBottom: '10px'}} 
                    placeholder={placeholder} 
                    onChange={this.handleChange} 
                    type="text" 
                    name={name}
                    required 
                    value={this.state[`${name}`]}/>
                    <br />
                </> 
              )})}
             <button>make payment</button>
             <p style={{fontSize: '15px'}} className="valid" id="message" ></p>
            </form>
            <PaymentList payments={this.state.payments} />
          </div>
          <div>
            <UiOutput balance={this.state.debt} 
            interest={this.state.interest} 
            amountOfPayment={this.state.amountOfPayment} 
            minimalDue={this.state.minDue} />  
          </div>
        </div>
      </div>
    )
  };
};

export default Calculator;