import React, { useState, useRef } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./sidebarLayout.css";

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  const sbarRef = useRef<HTMLDivElement | null>(null);

  const updateRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      setSidebarWidth(ref.current.offsetWidth);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="border-right">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            onRefUpdated={updateRef}
          />
        </Col>
        <Col
          md={9}
          className={`content-col ${collapsed ? "collapsed" : ""}`}
          // style={{
          //   transition: "transform 0.6s ease-in-out",
          //   transform: `translateX(${-sidebarWidth}px)`,
          // }}
        >
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarLayout;
