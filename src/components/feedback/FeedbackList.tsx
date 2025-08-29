import Spinner from "../Spinner.tsx";
import ErrorMessage from "../ErrorMessage.tsx";
import FeedbackItem from "./FeedbackItem.tsx";
import { useMemo } from "react";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
    const isLoading = useFeedbackItemsStore((state) => state.isLoading);
    const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
    const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
    const selectedCompany = useFeedbackItemsStore((state) => state.selectedCompany);

    const filteredFeedbackItems = useMemo(() => {
        return selectedCompany
            ? feedbackItems.filter((item) => item.company === selectedCompany)
            : feedbackItems;
    }, [feedbackItems, selectedCompany]);

    return (
        <ol className="feedback-list">
            {isLoading && <Spinner />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {filteredFeedbackItems.map((item) => (
                <FeedbackItem key={item.id} feedbackItem={item} />
            ))}
        </ol>
    );
}