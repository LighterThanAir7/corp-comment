import { create } from "zustand";
import type {TFeedbackItem} from "../lib/types.ts";

type Store = {
    feedbackItems: TFeedbackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    addItemToList: (text: string) => Promise<void>;
    selectCompany: (company: string) => void;
    fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set) => ({
    feedbackItems: [],
    isLoading: false,
    errorMessage: "",
    selectedCompany: "",
    addItemToList: async (text: string) => {
        const companyName = text
            .split(" ")
            .find((word) => word.includes("#"))!
            .substring(1);

        if (!companyName) return;

        const newItem: TFeedbackItem = {
            id: new Date().getTime(),
            text: text,
            upvoteCount: 0,
            daysAgo: 0,
            company: companyName,
            badgeLetter: companyName.substring(0, 1).toUpperCase(),
        };

        set((state) => ({
            feedbackItems: [...state.feedbackItems, newItem],
        }));

        try {
            await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: { Accept: "application/json", "Content-Type": "application/json" },
            });
        } catch (error) {
            console.error("Error posting feedback:", error);
        }
    },
    selectCompany: (company: string) => {
        set(() => ({
            selectedCompany: company,
        }));
    },
    fetchFeedbackItems: async () => {
        set(() => ({
            isLoading: true,
        }));

        try {
            const response = await fetch(
                "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            set(() => ({
                feedbackItems: data.feedbacks,
            }));
        } catch (error) {
            set(() => ({
                errorMessage: "Something went wrong. Please try again later.",
            }));
        }

        set(() => ({
            isLoading: false,
        }));
    },
}));