module.exports = async function ({
    ethers,
    getNamedAccounts,
    deployments,
    getChainId,
  }) {
    const { deploy } = deployments;
  
    const { deployer, dev } = await getNamedAccounts();
  
    await deploy("MyToken1", {
      from: deployer,
      log: true,
    });

    await deploy("MyToken2", {
        from: deployer,
        log: true,
      });
  };
  
  module.exports.tags = ["MyTokens"];