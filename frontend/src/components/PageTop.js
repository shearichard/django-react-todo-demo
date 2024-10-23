// frontend/src/components/PageTop.js

import React, { Component } from "react";
import DjangoLogo from "./DjangoLogo";
import ReactLogo from "./ReactLogo";
import InfoCircle from "./InfoCircle";
import SpacerImage from "./SpacerImage";
import Github from "./Github";
import { UncontrolledAlert } from "reactstrap";

export default class PageTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false 
    };
  }
  showInfo(){
      alert("showing info")
  }
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
    const infoRowController = {
    }
    //const { toggle, onSave } = this.props;
    return (
        <>
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <td>
                            <ReactLogo height="5em" width="5em"  />
                            &nbsp;
                            <DjangoLogo height="8em" width="5em"  />
                        </td>
                        <td>
                            <a href="https://github.com/shearichard/django-react-todo-demo" target="_blank" rel="noreferrer">
                                <span style={floatRight}><Github height="2em" width="2em" /></span>
                            </a>
                            <span onClick={this.showInfo} style={floatRight}>
                                <SpacerImage height="2em" width="0.5em" />
                            </span>
                            <span onClick={this.showInfo} style={floatRight}>
                                <InfoCircle height="2em" width="2em" />
                            </span>
                        </td>
                    </tr>
                    <tr style={infoRowController}>
                        <td colSpan={2}>
                            <UncontrolledAlert color="info" fade={false} isOpen={false}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </UncontrolledAlert>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <h3 className="text-grey text-uppercase text-center my-4" style={tweakHeader}>React/Django Demonstrator</h3>
                            <h4 className="text-grey text-uppercase text-left my-4">Todos</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
  }
}
