import {useState} from "react";
import {TriangleUpIcon} from "@radix-ui/react-icons";
import type {TFeedbackItem} from "../../lib/types.ts";
import * as React from "react";

type FeedbackItemProps = { feedbackItem: TFeedbackItem };

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
    const [open, setOpen] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

    const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.currentTarget.disabled = true;
        setUpvoteCount(prev => ++prev);
    }

	return (
		<li className={`feedback${open ? ' feedback--expand' : ''}`} onClick={() => setOpen(!open)}>
			<button onClick={handleUpvote}>
				<TriangleUpIcon />
				<span>{upvoteCount}</span>
			</button>

			<div>
				<p>{feedbackItem.badgeLetter}</p>
			</div>

			<div>
				<p>{feedbackItem.company}</p>
				<p>{feedbackItem.text}</p>
			</div>

			<p>{feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
		</li>
	);
}