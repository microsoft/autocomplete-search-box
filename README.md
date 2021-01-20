
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
        >
    </AutocompleteSearchBox>
