import {createContext, useMemo, useState} from "react";
import type {TFeedbackItem} from "../lib/types.ts";
import {useFeedbackItems} from "../lib/hooks.ts";

type FeedbackItemsContextProvider = {
    children: React.ReactNode;
}

type TFeedbackItemsContext = {
    isLoading: boolean;
    errorMessage: string;
    companyList: string[];
    filteredFeedbackItems: TFeedbackItem[];
    selectedCompany: string;
    handleAddToList: (text: string) => void;
    handleSelectCompany: (company: string) => void;
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);

export default function FeedbackItemsContextProvider({ children }: FeedbackItemsContextProvider) {
    const {
        feedbackItems,
        setFeedbackItems,
        isLoading,
        errorMessage
    } = useFeedbackItems();

    const [selectedCompany, setSelectedCompany] = useState('');

    const companyList = useMemo(() =>
        feedbackItems.map(item => item.company)
            .filter((company, index, array) => {
                return array.indexOf(company) === index;
            }), [feedbackItems]
    );

    const filteredFeedbackItems = useMemo(
        () => selectedCompany ?
            feedbackItems.filter(
                item => item.company === selectedCompany
            ) : feedbackItems, [feedbackItems, selectedCompany]
    );

    const handleAddToList = async (text: string) => {
        const companyName = text
            .split(' ')
            .find(word => word.includes('#'))!.substring(1);

        const newItem: TFeedbackItem = {
            id: new Date().getTime(),
            text: text,
            upvoteCount: 0,
            daysAgo: 0,
            company: companyName,
            badgeLetter: companyName.substring(0, 1).toUpperCase()
        }

        // Optimistic UI pattern
        setFeedbackItems([...feedbackItems, newItem]);

        await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
    }

    const handleSelectCompany = (company: string) => {
        setSelectedCompany(company);
    }

    return <FeedbackItemsContext.Provider
        value={{
            isLoading,
            errorMessage,
            companyList,
            selectedCompany,
            filteredFeedbackItems,
            handleAddToList,
            handleSelectCompany,
        }}
    >{children}</FeedbackItemsContext.Provider>
}