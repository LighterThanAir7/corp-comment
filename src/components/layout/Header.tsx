import PageHeading from "../PageHeading.tsx";
import Pattern from "../Pattern.tsx";
import Logo from "../Logo.tsx";
import FeedbackForm from "../feedback/FeedbackForm.tsx";
import {useFeedbackItemsStore} from "../../stores/feedbackItemsStore.ts";

export default function Header() {
    const addItemToList = useFeedbackItemsStore(state => state.addItemToList);

    return (
        <header>
            <Pattern />
            <Logo />
            <PageHeading />
            <FeedbackForm onAddToList={addItemToList} />
        </header>
    );
}