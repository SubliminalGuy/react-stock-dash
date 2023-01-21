const filterAllAssets = (data) => {
  const interestingCoinIds = [
    "bitcoin",
    "ethereum",
    "dogecoin",
    "solana",
    "polygon",
    "multi-collateral-dai",
  ];
  const interestingAssetData = data.filter(
    (item) => interestingCoinIds.indexOf(item.id) > -1
  );
  return interestingAssetData;
};

export default filterAllAssets;
