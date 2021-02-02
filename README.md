

# AutocompleteSearchBox
This package is a suite of various react components and utilities.

## AutocompleteSearchBox 
This component is an extension to the [@FluentUI SearchBox](https://developer.microsoft.com/en-us/fluentui#/controls/web/searchbox) to provide auto complete suggestions. 
All the props available for the FluentUI SearchBox also apply to AutocompleteSearchBox. 
The additional props are

    

    interface  IAutocompleteSearchBoxProps  extends  ISearchBoxProps {   
	    suggestions?: string[] | ISuggestionItem[];    
	    onSuggestionClicked: (suggestion: string | ISuggestionItem) =>  void;
        inProgress?: boolean;
    }

    export  interface  ISuggestionItem {
    	    getSuggestionItem: (query?: string) =>  JSX.Element;
    	    getSearchText: () =>  string;
    	}

Currently there are 2 flavors of the component. 

### With string suggestions
![AutocompleSearchBox with string suggestions](https://isearchutils.azureedge.net/img/stringSuggestions.jpg)

In this mode you pass the suggestions as a string array.

###  `Usage`

    const  heroes = [   
		    "Iron Man",
	        "Captain America",
            "Thor",
            "Hulk",
            "Black Widow",
            "Hawkeye",
	        "Black Panther",
	        "Ant Man",
	        "Spiderman",
        ];
    
    const [suggestions, setSuggestions] = React.useState<string[]>();
    const  onChange = (newText?: string) => {
        if (!newText || newText.trim() === "") {
	        setSuggestions(undefined);
        } else {
	        setSuggestions(
		        heroes.filter((hero) =>
			        hero.toLowerCase().includes(newText.toLowerCase())
			       ));
	        }
        };
    
    const  onSuggestionClicked = (suggestion: string | ISuggestionItem) => {
	   alert(typeof  suggestion === "string" ? suggestion : suggestion.getSearchText());
    };
    
	<AutocompleteSearchBox    
	    className="search-box"    
	    onSuggestionClicked={onSuggestionClicked}
        onChange={(_, newValue) => {
        onChange(newValue);
       }}
       suggestions={suggestions}>
     </AutocompleteSearchBox>
     
***className*** : CSS class to style the component as per your need  
***onSuggestionClicked*** : Called when a suggestion item is clicked  
***onChange*** : Called when query in the searchbox is changed (typing/pasting etc)  
***suggestions*** : A list of suggestion items (string[] or ISuggestionItem[]) to be shown  

### With custom layout suggestions
![AutocompleteSearchBox with custom suggestions](https://isearchutils.azureedge.net/img/customSuggestions.jpg)

In this mode, you pass the suggestions as an array of objects that implement `ISuggestionItem` interface.

### `Usage`

	    const queryThreshold = 3;
	    const [inProgress, setProgress] = React.useState(false);
	    const [dynamicSuggestions, setDynamicSuggestions] = React.useState<ISuggestionItem[]>();
	    
	    const getSearchQuery = (filter: string) =>
        `https://services.odata.org/V3/OData/OData.svc/Products?$filter=substringof('${filter}',Description)`;
    
      class Product implements ISuggestionItem {
        constructor(
          private ID: string,
          private Name: string,
          private Description: string,
          private Price?: number
        ) {}
        getSearchText: () => string = () => {
          return this.Name;
        };
        getSuggestionItem(query?: string) {
          return (
            <div key={this.ID} className="suggestionItem">
              <div className="suggestionTitleRow row">
                <p className="suggestionTitle col-8">
                  <HighlightTextView
                    text={this.Name}
                    filter={query || ""}
                  ></HighlightTextView>
                </p>
                <p className="suggestionPrice col-4">${this.Price}</p>
                <div className="col-12 suggestionSubtitle">
                  <HighlightTextView
                    text={this.Description}
                    filter={query || ""}
                  ></HighlightTextView>
                </div>
              </div>
            </div>
          );
        }
      }
      const onChangeDynamic = (newText?: string) => {
        if (!newText || newText.trim().length < queryThreshold) {
          setSuggestions(undefined);
        } else {
          setProgress(true);
          fetch(getSearchQuery(newText), {
            headers: { Accept: "application/json" },
          })
            .then((result) => result.json())
            .then((result) => {
              let products = result.value.map(
                (val: any) =>
                  new Product(val.ID, val.Name, val.Description, val.Price)
              );
              console.log(products);
              setDynamicSuggestions(products);
              setProgress(false);
            });
        }
      };


    <AutocompleteSearchBox    
	    className="search-box"
        onSuggestionClicked={onSuggestionClicked}
        onChange={(_, newValue) => {
	        onChangeDynamic(newValue);
        }}
        suggestions={dynamicSuggestions}
        inProgress={inProgress}
		debounceTime={500}
        >
    </AutocompleteSearchBox>

***inProgress***: If set true, a progress indicator is displayed on top of the suggestion callout.  
***debounceTime*** : Time in miliseconds. When set, the onChange is called after this delay once user stops typing. Used to avoid calling API for each character typed.  

## RenderIf
A component for conditional rendering in react.
If you are like me, you hate mixing javascript into the jsx code as it ruins the readability and formatting of the code.

### Usual conditional rendering

    {inProgress ? <div>Loading...</div> : <div>Loaded</div>}

  or

    {inProgress && <div>Loading...</div>}

### Using RenderIf

    <RenderIf  condition={inProgress}>
	    Loading...
    </RenderIf>

This may not look significant difference in the above example but it makes a huge impact in case of nested conditions and complex elements.

    <RenderIf condition={inProgress}>
    	<div className="inline">
    	  Loading <RenderIf condition={page > 0}>more results</RenderIf>
    	  <RenderIf condition={page === 0}> the default results</RenderIf>
    	</div>
    </RenderIf>

## HighlightTextView
A text view that highlights the matching part of the text. Specially useful in filters and searches.

### `Usage`

    <HighlightTextView  text={result.description}  filter={query}></HighlightTextView>
All the text snippets that match the query will be highlighted (turned to bold). It makes it find the matching terms in a large text.
The same has been used in the `AutocompleteSearchBox` with text suggestions mentioned above.
You can use it while building the suggestion items for `AutocompleteSearchBox` with custom suggestions.


> We will keep adding more components and utilities into the package. Keep watching for updates. Feel free to report issues if you find any, post feature requests and contribute to the development.
