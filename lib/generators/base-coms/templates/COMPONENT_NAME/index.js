import * as React from "react";
import { Button } from "antd";
// import { LocaleReceiverHoc } from "@/utils/hoc";
import "./index.less";

class <%=comsName %> extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
  // const { } = this.state;
  // const {} = this.props;
  return (
      <React.Fragment>
        <Button type='primary' onClick={()=>alert('this is a Demo')}> Demo </Button>
      </React.Fragment>
    );
  }
}

export default <%=comsName %>;
