import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../context";
import { Accordion, Icon, Checkbox, Input } from 'semantic-ui-react'
import styles from './Equip.module.css'
import Image from 'next/image';
import Confirm from '../Confirm/Confirm';
import axios from 'axios';

const Equip = () => {
    const { setViewState, balance, selectedNft, contract, setLoading, connectedWallet, setSuccessfulWrap } = useContext(AppContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const [maticPrice, setMaticPrice] = useState(0.60);
    const [showConfirm, setShowConfirm] = useState(false);
    const [firePolly, setFirePolly] = useState('/Fire Polly.png');
    const [waterPolly, setWaterPolly] = useState('/Water Polly.png');
    const [tokens, setTokens] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [layersObj, setLayersObj] = useState({
        'layers': [
            {
                "group": "Base",
                "trait": "Fire Polly.png"
            }
        ]
    });

    const getNewImage = async (trait, newLayers) => {
        const { data } = await axios.post('http://localhost:3001/mix/build', newLayers);
        setSuccessfulWrap(data.imageBase64)
        if (selectedNft === 'fire') {
            setFirePolly(data.imageBase64);
        } else {
            setWaterPolly(data.imageBase64);
        }
    }

    const getMaticPrice = async () => {
        try {
            const query = new URLSearchParams({ basePair: 'USD' }).toString();

            const currency = 'MATIC';
            const resp = await fetch(
                `https://api-eu1.tatum.io/v3/tatum/rate/${currency}?${query}`,
                {
                    method: 'GET',
                    headers: {
                        'x-api-key': '58e1693e-2d75-4b96-8d43-71c4e213cbea'
                    }
                }
            );

            const data = await resp.json();
            setMaticPrice(data.value.substring(0, 5));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (selectedNft === 'fire') {
            setName('FIRE POLLY');
            setTokens([...tokens, 0]);
            setLayersObj({
                'layers': [
                    {
                        "group": "Base",
                        "trait": "Fire Polly.png"
                    }
                ]
            })
        } else {
            setName('WATER POLLY')
            setTokens([...tokens, 1]);
            setLayersObj({
                'layers': [
                    {
                        "group": "Base",
                        "trait": "Water Polly.png"
                    }
                ]
            })
        }
        const getPrice = setInterval(() => {
            getMaticPrice();
        }, 5000);
        return () => {
            clearInterval(getPrice);
        }
    }, []);

    const handleSelectTrait = async (trait) => {
        let newLayers;
        switch (trait) {
            case 'halo':
                if (layersObj['layers'].find((group) => group.trait === 'Halo.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'Halo.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 2);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 2]);
                    const layers = { 'layers': [...layersObj['layers'], { 'group': 'Head', 'trait': 'Halo.png' }] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
            case 'horns':
                if (layersObj['layers'].find((group) => group.trait === 'Horn.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'Horn.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 3);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 3]);
                    const layers = { 'layers': [...layersObj['layers'], { 'group': 'Head', 'trait': 'Horn.png' }] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
            case 'rpg':
                if (layersObj['layers'].find((group) => group.trait === 'RPG.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'RPG.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 8);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 8]);
                    const layers = { 'layers': [{ 'group': 'Weapon', 'trait': 'RPG.png' }, ...layersObj['layers']] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
            case 'bustersword':
                if (layersObj['layers'].find((group) => group.trait === 'Buster Sword.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'Buster Sword.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 7);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 7]);
                    const layers = { 'layers': [{ 'group': 'Weapon', 'trait': 'Buster Sword.png' }, ...layersObj['layers']] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
            case 'skateboard':
                if (layersObj['layers'].find((group) => group.trait === 'Skateboard.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'Skateboard.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 5);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 5]);
                    const layers = { 'layers': [{ 'group': 'Board', 'trait': 'Skateboard.png' }, ...layersObj['layers']] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
            case 'surfboard':
                if (layersObj['layers'].find((group) => group.trait === 'Surfboard.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'Surfboard.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 6);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 6]);
                    const layers = { 'layers': [{ 'group': 'Board', 'trait': 'Surfboard.png' }, ...layersObj['layers']] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
            case 'blueBg':
                if (layersObj['layers'].find((group) => group.trait === 'Blue.png')) {
                    const layers = {
                        'layers': layersObj['layers'].filter((group) => group.trait !== 'Blue.png')
                    };
                    const newTokens = tokens.filter((token) => token !== 9);
                    setTokens(newTokens);
                    setLayersObj(layers);
                    newLayers = layers;
                } else {
                    setTokens([...tokens, 9]);
                    const layers = { 'layers': [{ 'group': 'Background', 'trait': 'Blue.png' }, ...layersObj['layers']] };
                    setLayersObj(layers);
                    newLayers = layers;
                }

                break;
        }

        await getNewImage(trait, newLayers)
    }

    const handleShowConfirm = async () => {
        setLoading(true);
        // const { data } = await axios.post("http://localhost:3001/mix/finalize", {"name": name, "description": description, "wallet": connectedWallet, "tokens": tokens, "layers": layersObj['layers']});
        // console.log(data);
        // const gas = await contract.estimateGas.wrap(data.tokens, data.uri, data.signature);
        // const estimate = gas.toString();
        // console.log(estimate)
        setShowConfirm(true);
        setLoading(false);
    }

    return (
        <div className={styles.equip}>
            {showConfirm && <Confirm maticPrice={maticPrice} name={name} description={description} tokens={tokens} layers={layersObj} />}
            <div className={styles.inventoryContainer}>
                <div>
                    <div className={styles.inventoryHeader}>
                        <div onClick={() => setViewState('select')} className={styles.back}>
                            <Image src="/back.svg" alt="back icon" width={21} height={21} />
                        </div>
                        <h2>INVENTORY</h2>
                    </div>
                    <div className={styles.accordian}>
                        <Accordion>
                            <div>
                                <Accordion.Title
                                    active={activeIndex === 0}
                                    onClick={() => setActiveIndex(0)}
                                    className={styles.title}
                                >
                                    Weapon
                                    <Icon className={styles.dropdownIcon} name='dropdown' />
                                </Accordion.Title>
                                <Accordion.Content className={styles.accordianItemContent} active={activeIndex === 0}>
                                    {parseInt(balance.bustersword) > 0 && <div onClick={() => handleSelectTrait('bustersword')} className={styles.inputItem}>
                                        <span>BUSTERSWORD</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.rpg) > 0 && <div onClick={() => handleSelectTrait('rpg')} className={styles.inputItem}>
                                        <span>RPG</span>
                                        <Checkbox />
                                    </div>}
                                </Accordion.Content>
                            </div>
                            <div>
                                <Accordion.Title
                                    active={activeIndex === 1}
                                    onClick={() => setActiveIndex(1)}
                                    className={styles.title}
                                >
                                    Head
                                    <Icon className={styles.dropdownIcon} name='dropdown' />
                                </Accordion.Title>
                                <Accordion.Content className={styles.accordianItemContent} active={activeIndex === 1}>
                                    {parseInt(balance.halo) > 0 && <div onClick={() => handleSelectTrait('halo')} className={styles.inputItem}>
                                        <span>HALO</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.horns) > 0 && <div onClick={() => handleSelectTrait('horns')} className={styles.inputItem}>
                                        <span>HORNS</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.mask) > 0 && <div className={styles.inputItem}>
                                        <span>MASK</span>
                                        <Checkbox />
                                    </div>}
                                </Accordion.Content>
                            </div>
                            <div>
                                <Accordion.Title
                                    active={activeIndex === 2}
                                    onClick={() => setActiveIndex(2)}
                                    className={styles.title}
                                >
                                    Board
                                    <Icon className={styles.dropdownIcon} name='dropdown' />
                                </Accordion.Title>
                                <Accordion.Content className={styles.accordianItemContent} active={activeIndex === 2}>
                                    {parseInt(balance.skateboard) > 0 && <div onClick={() => handleSelectTrait('skateboard')} className={styles.inputItem}>
                                        <span>SKATEBOARD</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.surfboard) > 0 && <div onClick={() => handleSelectTrait('surfboard')} className={styles.inputItem}>
                                        <span>SURFBOARD</span>
                                        <Checkbox />
                                    </div>}
                                </Accordion.Content>
                            </div>
                            <div>
                                <Accordion.Title
                                    active={activeIndex === 3}
                                    onClick={() => setActiveIndex(3)}
                                    className={styles.title}
                                >
                                    Background
                                    <Icon className={styles.dropdownIcon} name='dropdown' />
                                </Accordion.Title>
                                <Accordion.Content className={styles.accordianItemContent} active={activeIndex === 3}>
                                    {parseInt(balance.blueBg) > 0 && <div onClick={() => handleSelectTrait('blueBg')} className={styles.inputItem}>
                                        <span>BLUE BACKGROUND</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.cyanBg) > 0 && <div className={styles.inputItem}>
                                        <span>CYAN BACKGROUND</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.greenBg) > 0 && <div className={styles.inputItem}>
                                        <span>GREEN BACKGROUND</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.orangeBg) > 0 && <div className={styles.inputItem}>
                                        <span>ORANGE BACKGROUND</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.pinkBg) > 0 && <div className={styles.inputItem}>
                                        <span>PINK BACKGROUND</span>
                                        <Checkbox />
                                    </div>}
                                    {parseInt(balance.whiteBg) > 0 && <div className={styles.inputItem}>
                                        <span>WHITE BACKGROUND</span>
                                        <Checkbox />
                                    </div>}
                                </Accordion.Content>
                            </div>
                            <div>
                                <Accordion.Title
                                    active={activeIndex === 4}
                                    onClick={() => setActiveIndex(4)}
                                    className={styles.title}
                                >
                                    Description
                                    <Icon className={styles.dropdownIcon} name='dropdown' />
                                </Accordion.Title>
                                <Accordion.Content className={styles.accordianItemContent} active={activeIndex === 4}>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='TELL US YOUR POLLY’S STORY.' type="text" rows="4" cols='27' />
                                </Accordion.Content>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className={styles.pollyContainer}>
                <div className={styles.polly}>
                    <div className={styles.pollyTitle}>
                     <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {selectedNft === 'fire' ? <Image src={firePolly} alt="fire polly" height={266} width={266} /> : <Image src={waterPolly} alt="water polly" height={266} width={266} />}
                    <button onClick={handleShowConfirm} className={styles.button}>POLYMORPH</button>
                </div>
            </div>
        </div>
    )
}

export default Equip;