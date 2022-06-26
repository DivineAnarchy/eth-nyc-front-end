import { AppProvider } from '../context';
import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Header from '../components/Header/Header';

function Polys({ Component, pageProps }) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default Polys;
