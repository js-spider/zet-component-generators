import * as React from "react";
// import { Radio } from "antd";
import { LocaleReceiverHoc } from "@/utils/hoc";
import "./index.less";

export interface <%= comsName %>Props {
  /** props-attrs */
}

export interface <%= comsName %>State {
  /** state-attrs */
}

class <%=comsName %> extends React.Component<<%= comsName %>Props, <%= comsName %>State> {
  constructor(props: <%= comsName %>Props) {
    super(props);
    this.state = {};
  }

  render() {
  // const { } = this.state;
  // const {} = this.props;
  return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}

export default LocaleReceiverHoc("<%=comsMenu %>")(<%=comsName %>);
