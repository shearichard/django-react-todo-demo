import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const TodoTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const cursorOverSpan= {
    cursor:"default",
  }
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { props.displayCompleted(false); toggle('1'); }}
          >
            <span style={cursorOverSpan}>Incomplete Todos</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { props.displayCompleted(true); toggle('2'); }}
          >
            <span style={cursorOverSpan}>Completed Todos</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {props.showDescription &&
              <Row>
                <Col sm="12">
                  <h4>Incomplete Tasks</h4>
                </Col>
              </Row>
          }
        </TabPane>
        <TabPane tabId="2">
          {props.showDescription &&
              <Row>
                <Col sm="12">
                  <h4>Completed Tasks</h4>
                </Col>
              </Row>
          }
        </TabPane>
      </TabContent>
    </div>
  );
}

export default TodoTabs;
