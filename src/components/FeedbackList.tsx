import FeedbackItem from "./FeedbackItem.tsx";
import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";
import ErrorMessage from "./ErrorMessage.tsx";

export default function FeedbackList() {
	const [feedbackItems, setFeedbackItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchFeedbackItems = async () => {
			setIsLoading(true);

			try {
				const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');

				if (!response.ok) {
					throw new Error();
				}

				const data = await response.json();
				setFeedbackItems(data.feedbacks);
			} catch (error) {
				setErrorMessage('Somethin went wrong!');
			}
			setIsLoading(false);
		};

		fetchFeedbackItems();

		/*setIsLoading(true);
		fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks')
			.then(response => {
				if (!response.ok) {
					throw new Error();
				}
				return response.json();
			})
			.then(data => {
				setFeedbackItems(data.feedbacks);
				setIsLoading(false);
			})
			.catch(() => {
				setErrorMessage('Something went wrong.');
				setIsLoading(false);
			})*/
	}, [])

	return (
		<ol className="feedback-list">
			{isLoading && <Spinner />}
			{errorMessage && <ErrorMessage message={errorMessage} />}

			{feedbackItems.map(item => (
				<FeedbackItem key={item.id} feedbackItem={item} />
			))}
		</ol>
	);
}