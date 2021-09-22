// frontend/src/components/PageTop.js

import React, { Component } from "react";
import DjangoLogo from "./DjangoLogo";
import ReactLogo from "./ReactLogo";
import InfoCircle from "./InfoCircle";
import Github from "./Github";

export default class PageTop extends Component {
  render() {
    const tableStyle = {
        align: "center",
        margin: "auto",
        width: "50%",
    }
    const floatRight = {
        float: "right",
        margin: "auto",
    }
    const tweakHeader = {
        display:"inherit",
    }
	//const { toggle, onSave } = this.props;
	return (
        <table style={tableStyle}>
            <tr>
                <td>
                    <ReactLogo height="5em" width="5em"  />
                    &nbsp;
                    <DjangoLogo height="8em" width="5em"  />
                </td>
                <td>
                    <span style={floatRight}><InfoCircle height="2em" width="2em" /></span>
                    &nbsp;
                    <span style={floatRight}><Github height="2em" width="2em" /></span>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <h2 className="text-grey text-uppercase text-center my-4" style={tweakHeader}>React/Django Demonstrator</h2>
                    <h3 className="text-grey text-uppercase text-left my-4">Todos</h3>
                </td>
            </tr>
        </table>
	);
  }
}
