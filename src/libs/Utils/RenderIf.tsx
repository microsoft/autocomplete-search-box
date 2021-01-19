import React, { PropsWithChildren } from "react";

interface RenderIfProps {
  condition: boolean;
}

export const RenderIf = (
  props: PropsWithChildren<RenderIfProps>
): JSX.Element => {
  if (props.condition) {
    return <>{props.children}</>;
  }
  return <></>;
};

export default RenderIf;
