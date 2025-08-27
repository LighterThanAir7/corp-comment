import Container from "./components/Container.tsx";
import Footer from "./components/Footer.tsx";
import HashtagList from "./components/HashtagList.tsx";

function App() {
  return (
    <div className="app">
        <Footer />
        <Container />
        <HashtagList />
    </div>
  );
}

export default App
