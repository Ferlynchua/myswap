import React, { useContext, useEffect, useState } from "react";
import {
    ERC20Context,
    UniswapV2Router02Context,
    CurrentAddressContext,
} from "../hardhat/SymfoniContext";
import { ERC20 } from "../hardhat/typechain/ERC20";
import ethers from "ethers";
interface Props {
    tokenA: string;
    tokenB: string;
}
//import styled from 'styled-components';

// test test

export const Swap: React.FC<Props> = ({ tokenA, tokenB }) => {
    const ERC20Factory = useContext(ERC20Context);

    const [tokenAInstance, setTokenAInstance] = useState<ERC20>();
    const [tokenBInstance, setTokenBInstance] = useState<ERC20>();

    const [tokenASymbol, setTokenASymbol] = useState<string>();
    const [tokenBSymbol, setTokenBSymbol] = useState<string>();

    useEffect(() => {
        if (ERC20Factory.instance) {
            setTokenAInstance(ERC20Factory.instance!.attach(tokenA));
            setTokenBInstance(ERC20Factory.instance!.attach(tokenB));
        }
    }, [ERC20Factory.instance, tokenA, tokenB]);

    useEffect(() => {
        const fetchTokenSymbols = async () => {
            if (!tokenAInstance || !tokenBInstance) {
                return;
            }

            setTokenASymbol(await tokenAInstance.symbol());
            setTokenBSymbol(await tokenBInstance.symbol());
        };
        fetchTokenSymbols();
    }, [tokenAInstance, tokenBInstance])

    const [amount, setAmount] = useState<number>(0);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const router = useContext(UniswapV2Router02Context);
    const [exchangeAmount, setExchangeAmount] = useState<string>("0");

    useEffect(() => {
        const fetchExchangeAmount = async () => {
            if (!router.instance) {
                console.log("router instance not found");
                return;
            }

            if (amount > 0) {
                // router gets angry if you pass in a 0
                const amountsOut = await router.instance.getAmountsOut(
                    ethers.utils.parseEther(amount.toString()),
                    [tokenA, tokenB]
                );
                setExchangeAmount(ethers.utils.formatUnits(amountsOut[1].toString(), 18));
            }
        };

        fetchExchangeAmount();
    }, [router.instance, amount, tokenA, tokenB]);

    const [currentAddress] = useContext(CurrentAddressContext);

    const handleSwap = async () => {
        if (!router.instance || !tokenAInstance) {
            console.log("router or token instance not found");
            return;
        }
        const time = Math.floor(Date.now() / 1000) + 3600;

        await (
            await tokenAInstance.approve(
                router.instance.address,
                ethers.utils.parseEther(amount.toString())
            )
        ).wait();
        await (
            await router.instance.swapExactTokensForTokens(
                ethers.utils.parseEther(amount.toString()),
                0, // we shouldn't leave this as 0, it is dangerous in real trading
                [tokenA, tokenB],
                currentAddress,
                time
            )
        ).wait();
    };

    return (
        <div className="bg-gray-900 shadow sm:rounded-lg border-4 border-purple-900 h-80 ">
            <div className="px-4 py-3">
                <div className="clear-both h-20">
                    <div className="bg-green-500 px-6 border-none sm:rounded-lg float-left">

                        <div className="text-sm text-gray-200">Swap From: </div>

                        <div className="border-none relative z-10 px-1 py-2 float-left">
                            <img src="/images/h.png" alt="" width="60" height="50" />
                        </div>

                        <div className="text-white text-2xl font-bold font-sans">{tokenASymbol}</div>
                    </div>

                    <div className="bg-gray-500 border-4 border-green-400 mt-8 sm:rounded-lg float-right">
                        <div className="text-gray-200 text-xl text-left ml-3">Amount:
                            <input
                                type="text"
                                name="Amount"
                                id="amount"

                                className="mx-2 flex-item shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block  border-gray-300 rounded-md text-gray-800 text-2xl w-80 text-center bg-gray-200"
                                placeholder="20"
                                onChange={handleAmountChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-none relative z-10 px-1 py-2 ml-4 float-left">
                    <img src="/images/swapblue.gif" alt="" width="60" height="70" />
                </div>

                <div className="border-none clear-both h-20">
                    <div className="bg-pink-500  px-7 border-none -mt-4 sm:rounded-lg float-left">

                        <div className="text-sm text-gray-200">Swap To: </div>

                        <div className="border-none relative z-10 px-1 py-2 float-left">
                            <img src="/images/s.png" alt="" width="60" height="50" />
                        </div>

                        <div className="text-white text-2xl font-bold font-sans">{tokenBSymbol}</div>
                    </div>

                    <div className="bg-gray-500 border-4 border-pink-500 sm:rounded-lg mt-4 float-right">
                        <div className="text-gray-200 text-xl text-left ml-3">Receive:
                            <input
                                type="text"
                                name="Receive"
                                id="receive"
                                disabled
                                className="mx-2 flex-item shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block  border-gray-300 rounded-md text-gray-800 text-2xl w-80 text-center bg-gray-200"
                                placeholder="20"
                                value={exchangeAmount}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="float-right mr-4 mt-4">
                <button
                    type="submit"
                    className="justify-center px-4 py-1 border border-transparent shadow-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSwap}
                >
                    Connect to a wallet
                </button>

            </div>
        </div>

    );
};

