import { useState} from 'react';

const GetAllTradeIT = ({state})=>{
    const [s,sUse] = useState([]);

    const getTradeDetails = async (event)=>{
        event.preventDefault();
        const {contract} = state;
        const tradeID = document.querySelector("#tradeId").value;

        const arr = await contract.getspecificTrade(tradeID);
        const fetcherArray = [];
        fetcherArray.push(parseInt(arr[0]._hex));
        fetcherArray.push("\t --||||||-- \t");
        fetcherArray.push(arr[1]);
        fetcherArray.push("\t--||||||--\t");
        fetcherArray.push(arr[2]);
        fetcherArray.push("\t||||||\t");
        fetcherArray.push(parseInt(arr[3]._hex));
        fetcherArray.push("\t||||||||\t");
        if(arr[4] === false){
            fetcherArray.push("NOT Settled");
        }
        else{
            fetcherArray.push("Settled");
        }
        fetcherArray.push("\t||||||||\t");
        fetcherArray.push(parseInt(arr[5]._hex));
        fetcherArray.push("\t||||||\t");
        sUse(fetcherArray);
        
    }

  
    return (<div>
        <h1 style={ {textAlign: "center"}}>GET ANY TRADE</h1>
        <form onSubmit={getTradeDetails}>
            <label>Trade Id to find </label>
            <input type="text" id="tradeId" placeholder='Enter the trade ID'></input>
            <button type='submit'>Click to Get details</button>
        </form>
        <h3 style={ {textAlign: "center"}}>Trade Details</h3>
        <h5>TradeID------------------------------------Sender------------------------------------------------------------------------------------Receiver---------------------------------------------Amount--------Status-------------TimeStamp------------------</h5>      
            <div>
                {s.map((item)=>{
                    return(item)
                })}
                
            </div>
    </div>);
}

export default GetAllTradeIT;