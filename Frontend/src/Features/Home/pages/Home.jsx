import DownloadCard from "../components/downloadCard";
import GetDownload from "../components/getDownload";
import "../style/Home.scss";


const Home = () => {


    return (
        <div className="Home">

            <GetDownload />

            <DownloadCard />
        </div>
    );
};

export default Home;