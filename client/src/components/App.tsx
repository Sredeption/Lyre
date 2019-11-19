import React from "react";
import {Icon, NavBar} from "antd-mobile";
import {Home} from "./home";

export class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[
            <Icon key="1" type="ellipsis"/>,
          ]}
        >
          Lyre
        </NavBar>

        <Home/>

      </div>
    )
  }
}