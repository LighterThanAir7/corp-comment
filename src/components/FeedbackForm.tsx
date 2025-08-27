import {useState} from "react";
import {MAX_LENGTH} from "../constants/constants";
import * as React from "react";

export default function FeedbackForm() {
    const [feedbackText, setFeedbackText] = useState('');
    const charactersLeft = MAX_LENGTH - feedbackText.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length > MAX_LENGTH) {
            return;
        }
        setFeedbackText(newText);
    }

    return (
        <form className="form">
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