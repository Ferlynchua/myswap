const { task } = require("hardhat/config");

task("erc20:mint", "ERC20 mint")
  .addParam("token", "Token Address")
  .addParam("recipient", "Recipient Address")
  .addParam("count", "Number of tokens to mint")
  .setAction(async function (
    { token, recipient, count },
    { ethers: { getNamedSigner } },
    runSuper
  ) {
    const erc20 = await ethers.getContractFactory("MyToken1");

    const tokenInstance = erc20.attach(token);

    await (
      await tokenInstance
        .connect(await getNamedSigner("deployer"))
        .mint(recipient, ethers.utils.parseEther(count))
    ).wait();
  });

task("erc20:approve", "ERC20 approve")
  .addParam("token", "Token")
  .addParam("spender", "Spender")
  .addParam("amount", "Number of tokens to allow Spender")
  .setAction(async function (
    { token, spender, amount },
    { ethers: { getNamedSigner } },
    runSuper
  ) {
    const erc20 = await ethers.getContractFactory("MyToken1");

    const slp = erc20.attach(token);

    await (
      await slp
        .connect(await getNamedSigner("deployer"))
        .approve(spender, ethers.utils.parseEther(amount))
    ).wait();
  });

task("router:add-liquidity", "Router add liquidity")
  .addParam("tokenA", "Token A")
  .addParam("tokenB", "Token B")
  .addParam("tokenADesired", "Token A Desired")
  .addParam("tokenBDesired", "Token B Desired")
  .addParam("tokenAMinimum", "Token A Minimum")
  .addParam("tokenBMinimum", "Token B Minimum")
  .addParam("to", "To")
  .setAction(async function (
    {
      tokenA,
      tokenB,
      tokenADesired,
      tokenBDesired,
      tokenAMinimum,
      tokenBMinimum,
      to,
      deadline,
    },
    { ethers: { getNamedSigner } },
    runSuper
  ) {
    const router = await ethers.getContract("UniswapV2Router02");
    await run("erc20:approve", {
      token: tokenA,
      spender: router.address,
      amount: tokenADesired,
    });
    await run("erc20:approve", {
      token: tokenB,
      spender: router.address,
      amount: tokenBDesired,
    });
    const futureTime =
      (await ethers.provider.getBlock("latest")).timestamp + 3600 * 24 * 7;
    await (
      await router
        .connect(await getNamedSigner("deployer"))
        .addLiquidity(
          tokenA,
          tokenB,
          ethers.utils.parseEther(tokenADesired),
          ethers.utils.parseEther(tokenBDesired),
          ethers.utils.parseEther(tokenAMinimum),
          ethers.utils.parseEther(tokenBMinimum),
          to,
          futureTime
        )
    ).wait();
  });