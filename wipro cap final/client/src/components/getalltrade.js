import { useState} from 'react';

const GetAllTradeIT = ({state})=>{
    const [s,sUse] = useState([]);

    const getTradeDetails = async (event)=>{
        event.preventDefault();
        const {contract} = state;
        const tradeID = document.querySelector("#tradeId").value;

        const arr = await contract.listalltrades();
        const amt = [];
        
       
        arr.forEach(arritem => {
            let sidedArray=[];
            sidedArray.push(parseInt(arritem[0]._hex));
            sidedArray.push(["\t====\t"]);
            sidedArray.push(arritem[1]);
            sidedArray.push(["\t=====\t"]);
            sidedArray.push(arritem[2]);
            sidedArray.push(["\t=====\t"]);
            sidedArray.push(parseInt(arritem[3]._hex));
            sidedArray.push(["\t===\t"]);
            if (arritem[4]===false)
            {
                sidedArray.push("unsettled");
                
            }
            else
            {
                sidedArray.push("settled");
            }
            sidedArray.push(["\t====\t"]);
            sidedArray.push(parseInt(arritem[5]._hex));

            amt.push(sidedArray);
            
            amt.push("\t==============\t");
            
        }); sUse(amt);
        
        //console.log(arr);
        
    }

  
    return (<div>
        <h1 style={ {textAlign: "center"}}>CHECK ALL THE RECENT TRADES</h1>
        <button onClick= {getTradeDetails}>See all transactions</button>
          
        <h3 style={ {textAlign: "center"}}>Trade Details</h3>
        <h5>TradeID------------------------------------Sender------------------------------------------------------------------------------------Receiver---------------------------------------------Amount--------Status-------------TimeStamp------------------</h5>      
            <div>
                {s.map((item)=>{
                    return item;
                })}
                
            </div>
    </div>);
}

export default GetAllTradeIT;