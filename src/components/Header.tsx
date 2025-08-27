import PageHeading from "./PageHeading.tsx";
import Pattern from "./Pattern.tsx";
import Logo from "./Logo.tsx";
import FeedbackForm from "./FeedbackForm.tsx";

export default function Header() {
    return (
        <header>
            <Pattern />
            <Logo />
            <PageHeading />
            <FeedbackForm />
        </header>
    );
}