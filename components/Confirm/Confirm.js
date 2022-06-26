import Image from 'next/image';
import { useContext } from "react"
import { AppContext } from "../../context";
import axios from 'axios';
import styles from './Confirm.module.css';

const Confirm = ({ maticPrice, name, description, tokens, layers }) => {
    const {
        setLoading,
        contract,
        setViewState,
        setSuccessfulWrap,
        connectedWallet
      } = useContext(AppContext);
    const handleConfirm = async () => {
        setLoading(true);
        const { data } = await axios.post("http://localhost:3001/mix/finalize", {"name": name, "description": description, "wallet": connectedWallet, "tokens": tokens, "layers": layers['layers']});

        const tx = await contract.wrap(data.tokens, data.uri, data.signature, { gasLimit: 650000 });
        await tx.wait();
        
        setSuccessfulWrap(data.imageBase64);
        setViewState('success');
        setLoading(false);
    }
    return (
        <div className={styles.outer}>
            <div className={styles.graySpace}></div>
            <div className={styles.confirm}>
                <div className={styles.confirmContainer}>
                    <div className={styles.confirmLeft}>
                        <h1>POLLYMORPH</h1>
                        <p>When changing NFT gear from your Polly, you are agreeing to wrapping and/or unwrapping those NFT’s!</p>
                    </div>
                    <div className={styles.confirmRight}>
                        <div className={styles.maticPrice}>
                            <Image src="/polygon.svg" alt="polygon icon" width={49} height={49} />
                            <div className={styles.maticPriceContent}>
                                <span>{maticPrice} MATIC</span>
                                <div>$USD</div>
                            </div>
                        </div>
                        <button onClick={handleConfirm} className={styles.button}>YES, POLLYMORPH THESE TOKENS!</button>
                    </div>
                </div>
            </div>
            <div className={styles.graySpace}></div>
        </div>
    )
}

export default Confirm;