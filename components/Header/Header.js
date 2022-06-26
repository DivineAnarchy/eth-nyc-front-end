import { useContext } from "react"
import { AppContext } from "../../context";
import styles from './Header.module.css';

const Header = () => {
    const { connectedWallet, logout } = useContext(AppContext);
    return (
        <div className={styles.header}>
            <div>
                <h1 style={{ color: "#1C1C1F" }}><span style={{ color: '#7342DC' }}>POLLY</span>MORPH</h1>
            </div>
            {connectedWallet ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px'}}>
                <button className={styles.logout} style={{margin: '0'}} onClick={logout}>Logout</button><h3 style={{margin: '0 0 0 20px'}}>{connectedWallet}</h3>
            </div> : <div></div>
            }
        </div>
    )
}

export default Header;