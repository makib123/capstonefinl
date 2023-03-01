// SPDX-License-Identifier: GPL-3.0

pragma solidity = 0.8.17;

contract Tradetoken{

    // Structure code for the Trade Transaction.
    struct TradeData{
        uint tradeId;
        address from;
        address to;
        uint amount;
        bool status;
        uint timestamp;
    }

    mapping(uint => TradeData) private tradepart;
    TradeData [] private tradesheet; 
    uint private tradeidupdate;
    
    constructor() public{
        tradeidupdate = 1;
    }

    
//errors to handle- proper sender address;proper amount type,empty values sent
    function createTrade(address sender, uint amountgot) public  {
        require(amountgot != 0, "Please enter a value greater than 0");

        TradeData memory t = TradeData({
            tradeId : tradeidupdate,
            from : msg.sender,
            to : sender,
            amount : amountgot,
            status : false,
            timestamp : block.timestamp});

        tradepart[tradeidupdate] =t;
        tradesheet.push(t);
        tradeidupdate += 1;
       
    }

    
    function getrecenttransaction() public view returns(uint)
    {
        return tradeidupdate-1;
    }
    //tradeid should be present ,tradeid out of bound
    function getspecificTrade(uint tradeIdgiven) public view returns(uint tradeId, 
                                                address from, 
                                                address to,
                                                uint amount,
                                                bool status,
                                                uint timestamp){
        TradeData memory t = tradepart[tradeIdgiven];
        tradeId = t.tradeId;
        from = t.from;
        to = t.to;
        amount = t.amount;
        status = t.status;
        timestamp = t.timestamp;
    }

    //tradeid should be present ,tradeid out of bound
    function settleTrade(uint tradeIdSent) public{
        tradepart[tradeIdSent].status = true; 
        tradesheet[tradeIdSent-1]=tradepart[tradeIdSent];
    }
    
    function listalltrades() public view returns(TradeData[] memory)
    {
        return(tradesheet);
    } 

}