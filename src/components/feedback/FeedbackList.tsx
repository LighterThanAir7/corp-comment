import Spinner from "../Spinner.tsx";
import ErrorMessage from "../ErrorMessage.tsx";
import FeedbackItem from "./FeedbackItem.tsx";
import {useFeedbackItemsContext} from "../../lib/hooks.ts";

export default function FeedbackList() {
    const { filteredFeedbackItems, isLoading, errorMessage } = useFeedbackItemsContext();

	return (
		<ol className="feedback-list">
			{isLoading && <Spinner />}
			{errorMessage && <ErrorMessage message={errorMessage} />}

			{filteredFeedbackItems.map(item => (
				<FeedbackItem key={item.id} feedbackItem={item} />
			))}
		</ol>
	);
}