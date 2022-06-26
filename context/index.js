import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
	loading     	: false,
	viewState       : 'connect',
	showConfirm     : true,
	successfulWrap  : null,
	ens             : null,
	ensAvatar       : null,
    selectedNft     : null,
	contract        : null,
	provider        : null,
	signer          : null,
	connectedWallet : null,
	balance         : {
		firePolly: 0,
		waterPolly: 0,
		halo: 0,
		horns: 0,
		mask: 0,
		skateboard: 0,
		surfboard: 0,
		bustersword: 0,
		rpg: 0,
	}
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setLoading      		= (is_loading) => dispatch({ type: 'SET_LOADING', payload: is_loading });
	const setViewState      	= (viewState) => dispatch({ type: 'SET_VIEW_STATE', payload: viewState });
	const setSuccessfulWrap     = (nft) => dispatch({ type: 'SET_SUCCESSFUL_NFT', payload: nft });
	const setSelectedNft  		= (nft) => dispatch({ type: 'SET_SELECTED_NFT', payload: nft });
	const setContract  			= (contract) => dispatch({ type: 'SET_CONTRACT', payload: contract });
	const setProvider  			= (provider) => dispatch({ type: 'SET_PROVIDER', payload: provider });
	const setSigner  			= (signer) => dispatch({ type: 'SET_SIGNER', payload: signer });
	const setConnectedWallet  	= (wallet) => dispatch({ type: 'SET_CONNECTED_WALLET', payload: wallet });
	const setEnsAvatar  		= (url) => dispatch({ type: 'SET_ENS_AVATAR', payload: url });
	const setBalance  			= (balance) => dispatch({ type: 'SET_BALANCE', payload: balance });

	const logout = () => {
		setViewState('connect');
		setSelectedNft(null);
		setContract(null);
		setProvider(null);
		setSigner(null);
		setConnectedWallet(null);
		setEnsAvatar(null);
		setBalance({
			firePolly: 0,
			waterPoly: 0,
			halo: 0,
			horns: 0,
			mask: 0,
			skateboard: 0,
			surfboard: 0,
			bustersword: 0,
			rpg: 0,
		})
	}

	const exposed = {
		...state,
		logout,
		setLoading,
		setViewState,
		setSuccessfulWrap,
        setSelectedNft,
		setContract,
		setProvider,
		setSigner,
		setConnectedWallet,
		setBalance,
		setEnsAvatar
	};

	return <AppContext.Provider value={exposed}>
		{children}
	</AppContext.Provider>
}