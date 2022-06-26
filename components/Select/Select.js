import Image from "next/image";
import { useContext, useState } from "react"
import { AppContext } from "../../context";
import styles from './Select.module.css';

const Select = () => {
    const { setViewState, balance, selectedNft, setSelectedNft } = useContext(AppContext);
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <div className={styles.container}>
            <h4>Select the POLLY you want to MORPH</h4>
            <div className={styles.inventory}>
                <div className={styles.grid}>
                    {[...Array(balance.firePolly)].map((_el, i) => (
                        <div onClick={() => setSelectedNft('fire')} style={i === activeIndex && selectedNft === 'fire' ? { border: '5px solid #7342DC', height: '150px' } : { border: '1px solid black', height: '150px' }}>
                            <Image src="/Fire Polly.png" alt="fire polly" height={150} width={150} key={i} />
                        </div>
                    )
                    )}
                    {[...Array(balance.waterPolly)].map((_el, i) => (
                        <div onClick={() => setSelectedNft('water')} style={i === activeIndex && selectedNft === 'water' ? { border: '5px solid #7342DC', height: '150px' } : { border: '1px solid black', height: '150px' }}>
                            <Image src="/Water Polly.png" alt="water polly" height={150} width={150} key={i} />
                        </div>
                    )
                    )}
                </div>
                <button onClick={() => setViewState('equip')} className={styles.button}>CHOOSE A POLY</button>
            </div>
        </div>
    )
}

export default Select;