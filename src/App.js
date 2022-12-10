import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainGraph from "./components/MainGraph";
import Stats from "./components/Stats";
import SubGraph from "./components/SubGraph";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <MainGraph />
        <div className="Third">
          <Stats number={1} />
          <Stats number={2} />
          <Stats number={3} />
        </div>
        <div className="Half">
          <SubGraph number={1} />
          <SubGraph number={2} />
        </div>
        <div className="Third">
          <Stats number={4} />
          <Stats number={5} />
          <Stats number={6} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
