"use client"
import { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import abi from "../configure/abi.json";
import { ethers } from "ethers";

export default function Home() {
  const contractadd="0xd9145CCE52D386f254917e481eB44e9943F39138";
  const [address,setAddress]=useState("");
  const [contract,setContract]=useState(null);
  const [depositamount,setdepositamount]=useState("");
  const [withdrawamount,setwithdrawnamount]=useState("");
  const [balance,setbalance]=useState("");

  useEffect(()=>{
    async function initialize(){
      if(typeof window.ethereum!== undefined){
        const provider =new ethers.providers.Web3Provider(window.ethereum);
        const signer=provider.getSigner();
        const address= await signer.getAddress();
        const contract=new ethers.Contract(contractadd,abi,signer);
        setAddress(address);
        setContract(contract);
        
      }
    }
    initialize();
    

  })
  async function depo() {
    const log=await contract?.depositamount({value:depositamount});
    console.log(log);   
  }
  async function withdraw() {
    const log=await contract?.withdraw(withdrawamount);
    console.log(log); 
  }
  async function getBalance(){
    const log=await contract?.getBalance();
    console.log(log);
    setbalance(log.toString())
    
  }
  getBalance();
  console.log(address)
  return (
    <main >
      <Navbar/>
      <div className="flex justify-center flex-col ">
        <div className="flex space-x-5 my-2">
        <p>Deposit</p>
        <input type="number" onChange={(e)=>{setdepositamount(e.target.value)}} className="border-black outline none"/>
      <button onClick={depo} className="bg-blue-600 text-white px-3 py-2 rounded-lg">Deposit</button>
        <p>My Deposited Amount:{depositamount}</p>
        </div>

        <div className="flex space-x-5 my-2">
        <p>Withdraw</p>
        <input type="number" onChange={(e)=>{setwithdrawnamount(e.target.value)}} className="border-black outline none"/>
      <button onClick={withdraw} className="bg-blue-600 text-white px-3 py-2 rounded-lg">Withdraw</button>
        <p>My Withdraw Amount:{withdrawamount}</p>
        </div>
        
        <div>
          <p>My Balance:{balance}</p>
        </div>

      </div>
    </main>
  );
}

