import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export var RenderIf = function (props) {
    if (props.condition) {
        return _jsx(_Fragment, { children: props.children }, void 0);
    }
    return _jsx(_Fragment, {}, void 0);
};
export default RenderIf;
