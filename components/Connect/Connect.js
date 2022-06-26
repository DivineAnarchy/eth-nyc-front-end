import { useContext, useState } from "react"
import { AppContext } from "../../context";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers';
import POLLY from '../../artifacts/polly.json';
import FUSION from '../../artifacts/fusion.json';
import styles from './Connect.module.css';

const Connect = () => {
  const {
    setLoading,
    setSigner,
    setProvider,
    setContract,
    setConnectedWallet,
    setEnsAvatar,
    setBalance,
    setViewState
  } = useContext(AppContext);
  const [isApproved, setIsApproved] = useState(false);

  const login = async () => {
    try {
      // Connect
      setLoading(true);

      const provider = new WalletConnectProvider({
        infuraId: "fb0da908d3df474eaa2672c771296b03",
        rpc: {
          80001: "https://polygon-mumbai.infura.io/v3/fb0da908d3df474eaa2672c771296b03",
        }
      });
  
      await provider.enable();

      const web3Provider = new ethers.providers.Web3Provider(provider);
      const use_signer = web3Provider.getSigner(provider.accounts[0]);
      const mumbaiProvider = new ethers.providers.InfuraProvider("maticmum", "fb0da908d3df474eaa2672c771296b03");
      const mainnetProvider = new ethers.providers.InfuraProvider("mainnet", "fb0da908d3df474eaa2672c771296b03");
      const contract = new ethers.Contract('0x24E34FeeFfd32e2f3B7f6498C2567aec49e8fCe8', POLLY.abi, use_signer);
      const fusionContract = new ethers.Contract('0xCf5056098E83f8571fD00a9493976a30ad56fFA3', FUSION.abi, use_signer);
      const isApproved = await contract.isApprovedForAll(provider.accounts[0],"0xCf5056098E83f8571fD00a9493976a30ad56fFA3");
      console.log(isApproved)
      if(!isApproved){
        const confirm = window.confirm('You will need to grant approval to wrap/unwrap your NFTs.')
        if(confirm){
           await contract.setApprovalForAll('0xCf5056098E83f8571fD00a9493976a30ad56fFA3', true);
        }
      }

      const balance = await contract.balanceOfBatch([provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0],provider.accounts[0]], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
      const balanceFormat = {
        firePolly: balance[0].toString(),
        waterPolly: balance[1].toString(),
        halo: balance[2].toString(),
        horns: balance[3].toString(),
        mask: balance[4].toString(),
        skateboard: balance[5].toString(),
        surfboard: balance[6].toString(),
        bustersword: balance[7].toString(),
        rpg: balance[8].toString(),
        blueBg: balance[9].toString(),
        cyanBg: balance[10].toString(),
        greenBg: balance[11].toString(),
        orangeBg: balance[12].toString(),
        pinkBg: balance[13].toString(),
        whiteBg: balance[14].toString()
      }

      setSigner(use_signer);
      setProvider(web3Provider);
      setContract(fusionContract);
      setConnectedWallet(provider.accounts[0]);
      setBalance(balanceFormat);
      setLoading(false);
      setViewState('select')
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.connect}>
      <h1>POLLYMORPH</h1>
      <button className={styles.button} onClick={login}>CONNECT WALLET</button>
    </div>
  )
}

export default Connect;