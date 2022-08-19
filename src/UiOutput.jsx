import React from "react";

class UiOutput extends React.Component {
  
  render() {
    const { balance } = this.props;
    const { interest } = this.props;
    const { amountOfPayment } = this.props;
    const { minimalDue } = this.props
    return(
      <div>
        <h5 style={{marginBottom: '10px'}}>Total Debt</h5>
        <p style={{fontSize: '40px', marginTop: '10px'}}>{balance}</p>

        <div style={{display: 'flex'}}>
          <div style={{paddingRight: '15px'}}>
            <h6 style={{marginTop: '0', marginBottom: '0'}}>Interest Rate</h6>
            <p style={{marginTop: '10px', marginBottom: '10px'}}>{interest}</p>
          </div>

          <div>
            <h6 style={{marginTop: '0', marginBottom: '0'}}>Debt Free in</h6>
            <p style={{marginTop: '10px', marginBottom: '10px'}}>{amountOfPayment}</p>
            <h6 style={{marginTop: '10px',}}>payments</h6>
          </div>
        </div>

        <div>
              <h6 style={{marginBottom: '2px'}}>Minimum Due</h6>
              <p style={{marginTop: '2px'}}>{minimalDue}</p>
            </div>
      </div>
    )
  }

}

export default UiOutput;