import FeedbackList from "./FeedbackList.tsx";
import Header from "./Header.tsx";

export default function Container() {
    return (
        <main className="container">
            <Header />
            <FeedbackList />
        </main>
    );
}