import React from "react";
import {Icon, NavBar} from "antd-mobile";
import {Home} from "./home";
import lyra from "./lyra.svg";

export class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar mode="dark">
          <img src={lyra} style={{ width: 20, marginRight: 8, color: "white" }}/>Lyre
        </NavBar>
        <Home/>

      </div>
    )
  }
}
