import abi from './contract/Tradetoken.json';
import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import Newtrade from './components/submitnewtrade';
import Getalltrade from './components/getalltrade';
import Gettradebyid from './components/gettradebyid';
import Settle from './components/settletrade';
import './App.css';

function App() {
  const [state,setState]=useState(
    { provider:null,
      signer:null,
      contract:null
    }
  )
  
  useEffect(()=>{
  const connectwallet=async ()=>{
    const contractAddress="0x6C82F0792EdA7a8536908B4Dae536cb632Dd9981";
    const contractABI=abi.abi;

    try{
      const {ethereum} = window;
      
      if(ethereum){
        ethereum.request({method:"eth_requestAccounts"});
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress,contractABI,signer);

      setState({provider,signer,contract});

    }
    catch(error){
      console.log(error);
    }

  }
connectwallet();

},[]);
  
  
  
  return (
    <>
      <Newtrade state={state}></Newtrade>
      <Gettradebyid state={state}></Gettradebyid>
      <Settle state={state}></Settle>
      <Getalltrade state={state}></Getalltrade>
    </>
  );
}

export default App;
