import { useMemo } from "react";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
    const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
    const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

    const companyList = useMemo(() => {
        return feedbackItems
            .map((item) => item.company)
            .filter((company, index, array) => array.indexOf(company) === index);
    }, [feedbackItems]);

    return (
        <ul className="hashtags">
            {companyList.map((company) => (
                <HashtagItem
                    key={company}
                    company={company}
                    onSelectCompany={selectCompany}
                />
            ))}
        </ul>
    );
}