import {ethers} from 'ethers';
import {useState} from 'react';
const Trader= ({state}) => {
    const [errorcheck,seterror]=useState(false);

const start=async (event)=>{
    event.preventDefault();
    
    const {contract} = state;
    const sendToAddress = document.querySelector("#receiver").value;
    const sendAmount= document.querySelector("#amount").value;

    console.log("The transaction is happening fine : ",sendToAddress," : ",sendAmount);
    try
    {
    const transaction = await contract.createTrade(sendToAddress,sendAmount);
    
    await transaction.wait();
    console.log(transaction);
    }
    catch(error)
    {
        seterror(true);
    }
    //const id=await contract.getrecenttransaction();
    //await console.log(id);
    
}
return <>
    <h1 style={ {textAlign: "center"}}>CREATE A NEW TRADE</h1>
    <form onSubmit={start}>
        <label>Enter address of receiver</label>
        <input type="text" id='receiver' placeholder='enter address'></input>
        <label>Enter amount to send</label>
        <input type="number" id='amount' placeholder='enter amount'></input>
        <button type='Submit'>Make a Trade</button>
    </form>
    {
        errorcheck?<p>Sorry Dear Customer Your transaction declined due to the following below <br></br>$You must have entered an invalid sender address <br></br>$you must have entered amount in wrong format<br></br>$you must have entered amount smaller than or equalt to 0</p>:null  
        }
    
</>
}

export default Trader ;