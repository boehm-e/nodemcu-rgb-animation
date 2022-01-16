declare var chrome: any;
/*global chrome*/
import SnakeView from './SnakeView';
import Debug from './Debug';
import Animations from './Animations';
import Games from './Games';
import { Title } from './Elements';
import AudioVis from './AudioVis';

const Home = () => {
    return (
        <>
            <Title>Chambre d'Éline</Title>

            <SnakeView />
            <Animations />
            <Games />
            <AudioVis />
            <Debug />
        </>
    )
}

export default Home;