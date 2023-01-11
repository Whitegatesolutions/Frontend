import React from 'react';
import { usePaystackPayment } from 'next-paystack';
  
    const config = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: 20000,
      publicKey: 'pk_test_841d55e1c32a4ca73dfb721a2aa63bdde4a30b50',
  };
  
  // you can call this function anything
  const onSuccess = (reference : any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const PaystackHookExample = () => {
      const initializePayment = usePaystackPayment(config);
      return (
        <div>
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Paystack Hooks Implementation</button>
        </div>
      );
  };
  
  function Test() {
    return (
      <div className="App">
        <PaystackHookExample />
      </div>
    );
  }
  
  export default Test;