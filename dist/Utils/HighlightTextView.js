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
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var HighlightTextView = function (props) {
    return getHighlightedText(props.text + "", props.filter);
};
var getHighlightedText = function (text, highlight) {
    if (highlight === "")
        return _jsx(_Fragment, { children: text }, void 0);
    // Split text on highlight term, include term itself into parts, ignore case
    try {
        var parts = text.split(new RegExp("(" + highlight + ")", "gi"));
        return (_jsxs("span", { children: [" ", parts.map(function (part, i) { return (_jsx("span", __assign({ style: part.toLowerCase() === highlight.toLowerCase()
                        ? { fontWeight: "bold" }
                        : {} }, { children: part }), i)); }), " "] }, void 0));
    }
    catch (error) {
        return _jsx(_Fragment, { children: text }, void 0);
    }
};
export default HighlightTextView;
