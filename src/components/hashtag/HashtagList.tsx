import HashtagItem from "./HashtagItem";
import {useFeedbackItemsContext} from "../../lib/hooks.ts";

export default function HashtagList() {
    const { handleSelectCompany, companyList } = useFeedbackItemsContext();

    return (
      <ul className="hashtags">
          {companyList.map(company => (
              <HashtagItem onSelectCompany={() => handleSelectCompany(company)} company={company} />
          ))}
      </ul>
    );
}