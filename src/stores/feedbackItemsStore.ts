import {create} from "zustand";
import type {TFeedbackItem} from "../lib/types.ts";

export const useFeedbackItemsStore = create((set, get) => ({
    feedbackItems: [],
    isLoading: false,
    errorMessage: '',
    selectedCompany: '',
    getCompanyList: () => {
        return get()
            .feedbackItems.map(item => item.company)
            .filter((company, index, array) => {
                return array.indexOf(company) === index;
            })
    },
    getFilteredFeedbackItems: () => {
        const state = get();

        return state.selectedCompany ?
            state.feedbackItems.filter(
                item => item.company === state.selectedCompany
            ) : state.feedbackItems
    },
    addItemToList: async (text: string) => {
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

        set(state => ({
            feedbackItems: [...state.feedbackItems, newItem]
        }))

        await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
    },
    selectCompany: (company: string) => {
        set(() => ({ selectedCompany: company }))
    },
    fetchFeedbackItems: async () => {
        set(() => ({ isLoading: true }));

        try {
            const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            set(() => ({ feedbackItems: data.feedbacks }));
        } catch (error) {
            set(() => ({
                errorMessage: 'Somethin went wrong!'
            }))
        }
        set(() => ({
            isLoading: false
        }))
    }
}));