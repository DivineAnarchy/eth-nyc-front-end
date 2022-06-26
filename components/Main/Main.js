import { useContext } from "react"
import { AppContext } from "../../context";
import { Loader } from 'semantic-ui-react'
import Connect from "../Connect/Connect";
import Select from "../Select/Select";
import Equip from "../Equip/Equip";
import Success from "../Success/Success";

const Main = () => {
    const {viewState, loading} = useContext(AppContext);

    if(loading){
        return <Loader active/>
    }

    switch(viewState) {
        case 'connect':
            return <Connect />
        case 'select':
            return <Select />
        case 'equip':
            return <Equip />
        case 'success':
            return <Success />
        default:
            return <Connect />
    }
}

export default Main;