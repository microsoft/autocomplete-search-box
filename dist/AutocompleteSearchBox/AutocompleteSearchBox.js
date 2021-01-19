"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("@fluentui/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AutocompleteSearchBox = function AutocompleteSearchBox(props) {
  var textInput = _react2["default"].useRef(null);

  var _React$useState = _react2["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isCalloutFocussed = _React$useState2[0],
      setCalloutFocussed = _React$useState2[1];

  var _React$useState3 = _react2["default"].useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isCallOutVisible = _React$useState4[0],
      setIsCallOutVisible = _React$useState4[1];

  var _React$useState5 = _react2["default"].useState(true),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isLoading = _React$useState6[0],
      setIsLoading = _React$useState6[1];

  var _React$useState7 = _react2["default"].useState(""),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      query = _React$useState8[0],
      setQuery = _React$useState8[1];

  var focusZoneRef = _react2["default"].useRef(null);

  var _React$useState9 = _react2["default"].useState(),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      suggestions = _React$useState10[0],
      setSuggestions = _React$useState10[1];

  _react2["default"].useEffect(function () {
    setSuggestions(props.suggestions);
    setIsCallOutVisible(props.suggestions !== undefined);
  }, [props.suggestions]);

  _react2["default"].useEffect(function () {
    setIsLoading(props.inProgress === true ? true : false);
  }, [props.inProgress]);

  var ProgressIndicatorStyle = {
    itemProgress: {
      paddingBottom: "4px"
    }
  };
  var typeAheadCalloutStyle = {
    root: {
      boxShadow: _react.DefaultEffects.elevation4,
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
          minWidth: "250px"
        }
      }
    },
    container: {
      zIndex: 3,
      position: "relative"
    },
    calloutMain: {
      minHeight: "fit-content",
      maxHeight: "500px!important",
      height: "100%"
    }
  };

  var onFocus = function onFocus(event) {
    setIsCallOutVisible(suggestions !== undefined && suggestions.length > 0);
    if (props.onFocus) props.onFocus(event);
  };

  var onKeyDown = function onKeyDown(ev) {
    switch (ev.which) {
      case _react.KeyCodes.down:
        {
          var _focusZoneRef$current;

          setCalloutFocussed(true);
          (_focusZoneRef$current = focusZoneRef.current) === null || _focusZoneRef$current === void 0 ? void 0 : _focusZoneRef$current.focus();
          ev.preventDefault();
          break;
        }

      default:
        setCalloutFocussed(false);
    }
  };

  var renderProgressIndicator = function renderProgressIndicator() {
    if (isLoading) {
      return /*#__PURE__*/_react2["default"].createElement(_react.ProgressIndicator, {
        styles: ProgressIndicatorStyle
      });
    }

    return null;
  };

  var onSuggestionClicked = function onSuggestionClicked(suggestion) {
    var query = typeof suggestion === "string" ? suggestion : suggestion.getSearchText();
    setQuery(query);
    hideSuggestions();
    props.onSuggestionClicked(suggestion);
  };

  var hideSuggestions = function hideSuggestions() {
    // console.log("HIDE CALLOUT");
    setIsCallOutVisible(false);
  };

  var onSuggestionKeyDown = function onSuggestionKeyDown(event, suggestion) {
    console.log(event);
    if (event.which === _react.KeyCodes.enter) onSuggestionClicked(suggestion);
  };

  var renderSuggestions = function renderSuggestions() {
    var views = [];
    if (!suggestions) return /*#__PURE__*/_react2["default"].createElement(_react2["default"].Fragment, null);
    suggestions.forEach(function (suggestion, i) {
      if (typeof suggestion === "string") {
        views.push(getDefaultListItem(suggestion, i));
      } else {
        views.push( /*#__PURE__*/_react2["default"].createElement(_react.Link, {
          style: {
            margin: "2px"
          },
          key: i,
          onKeyPress: function onKeyPress(e) {
            return onSuggestionKeyDown(e, suggestion);
          },
          onClick: function onClick(e) {
            return onSuggestionClicked(suggestion);
          },
          className: "oneSuggestion",
          role: "listitem"
        }, suggestion.getSuggestionItem()));
      }
    });
    return views;
  };

  var defaultSuggestionItem = {
    width: "100%",
    "float": "left",
    padding: "5px"
  };

  var getDefaultListItem = function getDefaultListItem(suggestion, key) {
    return /*#__PURE__*/_react2["default"].createElement("div", {
      className: "oneSuggestion",
      role: "listitem",
      key: key
    }, /*#__PURE__*/_react2["default"].createElement(_react.Link, {
      onClick: function onClick(e) {
        return onSuggestionClicked(suggestion);
      },
      style: defaultSuggestionItem
    }, suggestion));
  };

  var onCallOutDismiss = function onCallOutDismiss() {
    setIsCallOutVisible(false);
  };

  var searchContainer = {
    width: "fit-content",
    margin: "auto"
  };

  var onChange = function onChange(event, newValue) {
    setQuery(newValue || "");
    if (props.onChange) props.onChange(event, newValue);
  };

  return /*#__PURE__*/_react2["default"].createElement("div", {
    style: searchContainer
  }, /*#__PURE__*/_react2["default"].createElement("div", {
    ref: textInput,
    className: "searchBar"
  }, /*#__PURE__*/_react2["default"].createElement(_react.SearchBox, _extends({}, props, {
    autoComplete: "off",
    onChange: onChange,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    value: query
  }))), /*#__PURE__*/_react2["default"].createElement(_.RenderIf, {
    condition: isLoading || suggestions !== undefined && isCallOutVisible
  }, /*#__PURE__*/_react2["default"].createElement(_react.Callout, {
    styles: typeAheadCalloutStyle,
    isBeakVisible: false,
    target: textInput.current,
    onDismiss: onCallOutDismiss,
    directionalHint: _react.DirectionalHint.bottomLeftEdge,
    directionalHintForRTL: _react.DirectionalHint.bottomRightEdge,
    setInitialFocus: isCalloutFocussed // hidden={!isCallOutVisible}
    ,
    doNotLayer: true
  }, renderProgressIndicator(), /*#__PURE__*/_react2["default"].createElement(_react.FocusZone, {
    direction: _react.FocusZoneDirection.bidirectional,
    handleTabKey: _react.FocusZoneTabbableElements.all,
    id: "focusZoneSuggestions",
    componentRef: focusZoneRef
  }, renderSuggestions()))));
};

var _default = AutocompleteSearchBox;
exports["default"] = _default;