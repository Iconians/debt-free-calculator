import React from "react";

class PaymentList extends React.Component {

  render() {
    const { payments } = this.props;
    return (
      <div>
        <h6 style={{marginBottom: '0',marginTop: '10px'}}>Previous Payments</h6>
        <ul style={{listStyle: 'none', marginTop: '10px'}}>
          {payments.map((payment) => (
          <li key={payment.id}>{payment.number}</li>
        ))}
        </ul>
      </div>
   
    )
  }
}

export default PaymentList;