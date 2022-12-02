import playlisterLogo from './images/playlisterLogo.png';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <img src={playlisterLogo} alt="playlisterLogo" />
            <div>{"\n"}Magical moments are created with music, create a moment today</div>
        </div>
    )
}