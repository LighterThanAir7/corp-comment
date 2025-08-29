import PageHeading from "../PageHeading.tsx";
import Pattern from "../Pattern.tsx";
import Logo from "../Logo.tsx";
import FeedbackForm from "../feedback/FeedbackForm.tsx";
import {useFeedbackItemsContext} from "../../lib/hooks.ts";

export default function Header() {
    const { handleAddToList } = useFeedbackItemsContext();

    return (
        <header>
            <Pattern />
            <Logo />
            <PageHeading />
            <FeedbackForm onAddToList={handleAddToList} />
        </header>
    );
}