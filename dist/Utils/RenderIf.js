"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RenderIf = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RenderIf = function RenderIf(props) {
  if (props.condition) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, props.children);
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};

exports.RenderIf = RenderIf;
var _default = RenderIf;
exports["default"] = _default;