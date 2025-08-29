import Container from "./layout/Container.tsx";
import Footer from "./layout/Footer.tsx";
import HashtagList from "./hashtag/HashtagList.tsx";
import {useEffect} from "react";
import {useFeedbackItemsStore} from "../stores/feedbackItemsStore.ts";

function App() {
    const fetchFeedbackItems = useFeedbackItemsStore(
        state => state.fetchFeedbackItems
    );

    useEffect(() => {
        fetchFeedbackItems();
    }, []);

    return (
        <div className="app">
            <Footer />
            <Container />
            <HashtagList />
        </div>
    );
}

export default App
