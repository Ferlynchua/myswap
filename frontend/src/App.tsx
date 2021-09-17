import React from "react";
import "./App.css";
import { Symfoni } from "./hardhat/SymfoniContext";
import { Swap } from "./components/Swap";

function App() {
  return (
    <div className="App">
      <Symfoni autoInit={true}>
        <div className="min-h-screen bg-bgpic bg-no-repeat bg-cover bg-center">
          <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 border-2 border-transparent">
            <div className="border-none h-24 mt-44 w-96 px-3 mx-auto">
              <div className="border-none text-green-500 font-sans text-6xl w-44 float-left">
                Switch
              </div>
              <div className="border-none text-pink-500 font-sans text-6xl w-44 float-right">
                -Swap
              </div>
            </div>
            <Swap
              tokenA="0x759ce295723232666CDc52c06b401Fe808788CDd"
              tokenB="0x342534faC03e2a689b6Cd459C356b7862de8E55a"
            ></Swap>
          </div>
        </div>
      </Symfoni>
    </div>
  );
}

export default App;