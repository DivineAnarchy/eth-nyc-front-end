export const reducer = (state, action) => {
	let newState;

	switch (action.type) {
		case 'SET_LOADING':
			newState = { loading: action.payload };

			break;
		case 'SET_VIEW_STATE':
			newState = { viewState: action.payload };

			break;
		case 'SET_SUCCESSFUL_NFT':
			newState = { successfulWrap: action.payload };

			break;
		case 'SET_SELECTED_NFT':
			newState = { selectedNft: action.payload };

			break;
		case 'SET_CONTRACT':
			newState = { contract: action.payload };

			break;
		case 'SET_PROVIDER':
			newState = { provider: action.payload };

			break;
		case 'SET_SIGNER':
			newState = { signer: action.payload };

			break;
		case 'SET_CONNECTED_WALLET':
			newState = { connectedWallet: action.payload };

			break;
		case 'SET_ENS_AVATAR':
			newState = { ensAvatar: action.payload };

			break;
		case 'SET_BALANCE':
			newState = { balance: action.payload };

			break;
		default:
			return state;
	}

	return {
		...state,
		...newState
	}
}