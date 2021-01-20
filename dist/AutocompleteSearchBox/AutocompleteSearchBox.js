var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Callout, DefaultEffects, DirectionalHint, FocusZone, ProgressIndicator, SearchBox, FocusZoneDirection, FocusZoneTabbableElements, Link, KeyCodes, } from "@fluentui/react";
import React from "react";
import { RenderIf } from "..";
import HighlightTextView from "../Utils/HighlightTextView";
var AutocompleteSearchBox = function (props) {
    var textInput = React.useRef(null);
    var _a = React.useState(false), isCalloutFocussed = _a[0], setCalloutFocussed = _a[1];
    var _b = React.useState(false), isCallOutVisible = _b[0], setIsCallOutVisible = _b[1];
    var _c = React.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = React.useState(""), query = _d[0], setQuery = _d[1];
    var focusZoneRef = React.useRef(null);
    var _e = React.useState(), suggestions = _e[0], setSuggestions = _e[1];
    React.useEffect(function () {
        setSuggestions(props.suggestions);
        setIsCallOutVisible(props.suggestions !== undefined);
    }, [props.suggestions]);
    React.useEffect(function () {
        setIsLoading(props.inProgress === true ? true : false);
    }, [props.inProgress]);
    var ProgressIndicatorStyle = {
        itemProgress: {
            paddingBottom: "4px",
        },
    };
    var typeAheadCalloutStyle = {
        root: {
            boxShadow: DefaultEffects.elevation4,
            borderRadius: 2,
            marginTop: 0,
            maxWidth: 800,
            width: "100%",
            minWidth: "250px",
            overflow: "hidden",
            //maxHeight: '500px!important'
            top: "0px!important",
            left: "0px",
            selectors: {
                "@media(max-width: 600px)": {
                    top: "0px",
                    left: "0px",
                    bottom: "-200px!important",
                    minWidth: "250px",
                },
            },
        },
        container: {
            zIndex: 3,
            position: "relative",
        },
        calloutMain: {
            minHeight: "fit-content",
            maxHeight: "500px!important",
            height: "100%",
        },
    };
    var onFocus = function (event) {
        setIsCallOutVisible(suggestions !== undefined && suggestions.length > 0);
        if (props.onFocus)
            props.onFocus(event);
    };
    var onKeyDown = function (ev) {
        var _a;
        switch (ev.which) {
            case KeyCodes.down: {
                setCalloutFocussed(true);
                (_a = focusZoneRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                ev.preventDefault();
                break;
            }
            default:
                setCalloutFocussed(false);
        }
    };
    var renderProgressIndicator = function () {
        if (isLoading) {
            return _jsx(ProgressIndicator, { styles: ProgressIndicatorStyle }, void 0);
        }
        return null;
    };
    var onSuggestionClicked = function (suggestion) {
        var query = typeof suggestion === "string" ? suggestion : suggestion.getSearchText();
        setQuery(query);
        hideSuggestions();
        props.onSuggestionClicked(suggestion);
    };
    var hideSuggestions = function () {
        // console.log("HIDE CALLOUT");
        setIsCallOutVisible(false);
    };
    var onSuggestionKeyDown = function (event, suggestion) {
        console.log(event);
        if (event.which === KeyCodes.enter)
            onSuggestionClicked(suggestion);
    };
    var renderSuggestions = function () {
        var views = [];
        if (!suggestions)
            return _jsx(_Fragment, {}, void 0);
        suggestions.forEach(function (suggestion, i) {
            if (typeof suggestion === "string") {
                views.push(getDefaultListItem(suggestion, i));
            }
            else {
                views.push(_jsx(Link, __assign({ style: { margin: "2px" }, onKeyPress: function (e) { return onSuggestionKeyDown(e, suggestion); }, onClick: function (e) { return onSuggestionClicked(suggestion); }, className: "oneSuggestion", role: "listitem" }, { children: suggestion.getSuggestionItem(query) }), i));
            }
        });
        return views;
    };
    var defaultSuggestionItem = {
        width: "100%",
        float: "left",
        padding: "5px",
    };
    var getDefaultListItem = function (suggestion, key) {
        return (_jsx("div", __assign({ className: "oneSuggestion", role: "listitem" }, { children: _jsx(Link, __assign({ onClick: function (e) { return onSuggestionClicked(suggestion); }, style: defaultSuggestionItem }, { children: _jsx(HighlightTextView, { text: suggestion, filter: query }, void 0) }), void 0) }), key));
    };
    var onCallOutDismiss = function () {
        setIsCallOutVisible(false);
    };
    var searchContainer = {
        width: "fit-content",
        margin: "auto",
    };
    var onChange = function (event, newValue) {
        setQuery(newValue || "");
        if (props.onChange)
            props.onChange(event, newValue);
    };
    return (_jsxs("div", __assign({ style: searchContainer }, { children: [_jsx("div", __assign({ ref: textInput, className: "searchBar" }, { children: _jsx(SearchBox, __assign({}, props, { autoComplete: "off", onChange: onChange, onFocus: onFocus, onKeyDown: onKeyDown, value: query }), void 0) }), void 0),
            _jsx(RenderIf, __assign({ condition: isLoading || (suggestions !== undefined && isCallOutVisible) }, { children: _jsxs(Callout, __assign({ styles: typeAheadCalloutStyle, isBeakVisible: false, target: textInput.current, onDismiss: onCallOutDismiss, directionalHint: DirectionalHint.bottomLeftEdge, directionalHintForRTL: DirectionalHint.bottomRightEdge, setInitialFocus: isCalloutFocussed, 
                    // hidden={!isCallOutVisible}
                    doNotLayer: true }, { children: [renderProgressIndicator(), _jsx(FocusZone, __assign({ direction: FocusZoneDirection.bidirectional, handleTabKey: FocusZoneTabbableElements.all, id: "focusZoneSuggestions", componentRef: focusZoneRef }, { children: renderSuggestions() }), void 0)] }), void 0) }), void 0)] }), void 0));
};
export default AutocompleteSearchBox;
