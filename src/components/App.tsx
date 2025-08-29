import Container from "./layout/Container.tsx";
import Footer from "./layout/Footer.tsx";
import HashtagList from "./hashtag/HashtagList.tsx";
import FeedbackItemsContextProvider from "../context/FeedbackItemsContextProvider.tsx";

function App() {
    return (
        <div className="app">
            <Footer />

            <FeedbackItemsContextProvider>
                <Container />
                <HashtagList />
            </FeedbackItemsContextProvider>
        </div>
    );
}

export default App
