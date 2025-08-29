import {useState} from "react";
import {MAX_LENGTH} from "../../constants/constants.ts";
import * as React from "react";

type FeedbackFormProps = {
    onAddToList: (text: string) => void;
}

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
    const [feedbackText, setFeedbackText] = useState('');
    const [showValidIndicator, setShowValidIndicator] = useState(false);
    const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
    const charactersLeft = MAX_LENGTH - feedbackText.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length > MAX_LENGTH) {
            return;
        }
        setFeedbackText(newText);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic validation
        if (feedbackText.includes('#') && feedbackText.length >= 5) {
            setShowValidIndicator(true);
            setTimeout(() => setShowValidIndicator(false), 2000);
        } else {
            setShowInvalidIndicator(true);
            setTimeout(() => setShowInvalidIndicator(false), 2000);
            return;
        }

        onAddToList(feedbackText);
        setFeedbackText('');
    }

    return (
        <form className={`form${showValidIndicator ? ' form--valid' : ''}${showInvalidIndicator ? ' form--invalid' : ''}`} onSubmit={handleSubmit}>
            <textarea
                id="feedback-textarea"
                value={feedbackText}
                onChange={handleChange}
                placeholder="blabla"
                spellCheck={false}
            />
            <label htmlFor="feedback-textarea">
                Enter your feedback here, remember to #hastag the company
            </label>
            <div>
                <p className="u-italic">{charactersLeft}</p>
                <button>
                    <span>Submit</span>
                </button>
            </div>
        </form>
    );
}