const express = require('express');
const Web3 = require('web3')
const transactionSchema = require('../Models/transaction')
const web3eth = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const privateKey = '2f9313c08c79288833e10bb0df31f87bbe642af51cfba82dfd42670b88b6fd71';


const balance = async (req, res) =>{
    const {account} = req.body
    try{
     const balance = web3eth.utils.fromWei(
            await web3eth.eth.getBalance(account)
        );
        res.status(200).json({
            Message : 'Balance fetched successfully!',
                Account_Number : account,
                Balance : balance
        })
    }catch(err){
        res.status(404).json({
            message : 'account not found'
        })
    }
}

const transaction = async (req, res, next) => {
    try{
        let transaction = new transactionSchema (
            {sender, receiver, amount} = req.body,
            console.log (sender, receiver, amount))

            const gasLimit = await web3eth.eth.estimateGas({
                from: sender,
                to: receiver,
                value: web3eth.utils.toWei(amount.toString(), 'ether'),
             });
             console.log(gasLimit, 'doifif')

             const value = web3eth.utils.toWei(amount.toString(), "ether");
              const gasPrice = await web3eth.eth.getGasPrice();
 
                   const transactionFee = gasPrice * gasLimit;
 
                    amount = value - transactionFee;
 
              console.log(amount, gasPrice, gasLimit, transactionFee, amount, 'dki')
 
        

            // const value = await web3eth.utils.toWei(amount.toString(), 'ether');
            // const gasPrice = await web3eth.eth.getGasPrice();

            // transactionFee = gasPrice * gasLimit;
            // amount = value - transactionFee;

            const ETHTransaction = await web3eth.eth.accounts.signTransaction(
                {
                   from: sender,
                   to: receiver,
                   value: amount,
                   gasLimit: gasLimit,
                 
                   
                },
             
                privateKey
                
             );
             

            // const ETHTransaction = await web3eth.eth.accountsignTransaction(
            //     {
            //         from : sender,
            //         to : receiver,
            //         value : amount,
            //         gasLimit : gasLimit
            //     },
            //      privateKey
            // )

            const ETHReceipt = await web3eth.eth.sendSignedTransaction(ETHTransaction.rawTransaction);

            try{
                transaction.save()
                res.status(200).json({ETHReceipt})
            }catch(err){
                res.status(404).json({
                    message : ' not saved'  
                })
            }

            console.log(ETHReceipt);
            //res.send(ETHReceipt)
        
           // return ETHReceipt;
        

    }catch(err){
        res.status(404).json({
            message : 'transaction failed'
        })
    }
}

module.exports.transaction = transaction
module.exports.balance = balance