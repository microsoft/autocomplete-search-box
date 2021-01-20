/// <reference types="react" />
import { ISearchBoxProps } from "@fluentui/react";
export interface ISuggestionItem {
    getSuggestionItem: (query?: string) => JSX.Element;
    getSearchText: () => string;
}
interface IAutocompleteSearchBoxProps extends ISearchBoxProps {
    suggestions?: string[] | ISuggestionItem[];
    onSuggestionClicked: (suggestion: string | ISuggestionItem) => void;
    inProgress?: boolean;
}
declare const AutocompleteSearchBox: (props: IAutocompleteSearchBoxProps) => JSX.Element;
export default AutocompleteSearchBox;
