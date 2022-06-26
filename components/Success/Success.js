import { useContext } from "react"
import { AppContext } from "../../context";
import Image from "next/image";
import styles from './Success.module.css';

const Success = () => {
    const {setViewState, successfulWrap} = useContext(AppContext);
    return (
        <div className={styles.success}>
            <h4>You have successfully morphed your Polly!</h4>
            <div className={styles.container}>
                <h3>FIRE POLLY</h3>
                <Image src={successfulWrap} alt="wrapped token" width={240} height={240} />
                <button className={styles.button}><a style={{textDecoration: 'none', color: 'white'}} href="https://medium.com/the-ethereum-name-service/step-by-step-guide-to-setting-an-nft-as-your-ens-profile-avatar-3562d39567fc" target="_blank">MAKE ENS AVATAR</a></button>
                <button className={styles.button}><a style={{textDecoration: 'none', color: 'white'}} href="https://docs.ens.domains/" target="_blank">WHAT’S AN ENS?</a></button>
                <button className={styles.button} onClick={() => setViewState('select')}>CHOOSE ANOTHER POLLY</button>
            </div>
        </div>
    )
}

export default Success;