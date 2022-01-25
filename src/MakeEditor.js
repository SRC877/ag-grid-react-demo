import * as React from "react";

class MakeEditor extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        <select value={value} style={{ width: "100%" }}>
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="Porsche">Porsche</option>
        </select>
      </div>
    );
  }
}

export default MakeEditor;