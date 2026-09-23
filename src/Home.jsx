import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Swip from './Swip';
import Anilist from './Anilist';
import Footer from './Footer';

const Home = () => {
  return (
    <div style={{backgroundColor: "#201F31"}}>
      <Swip />
      <Anilist />
      <Footer />
    </div>
  )
}

export default Home;