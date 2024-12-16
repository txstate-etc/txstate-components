import { Layout } from "../components";
import { styled } from "styled-components";

export default {
  title: "Components|Layout",
  component: Layout,
};

export const LayoutStory = {
  render: () => (
    <Layout
      style={{
        backgroundColor: "#9477B1",
        height: 500,
      }}
      sidebarSize={100}
    >
      <Layout
        style={{
          backgroundColor: "#3B1838",
        }}
      />
      <Layout.Sidebar
        style={{
          backgroundColor: "#590A42",
        }}
      />
      <Layout.Content />
      <Layout.Footer
        style={{
          backgroundColor: "#3B1838",
        }}
      />
    </Layout>
  ),

  name: "Layout",
};

export const HeaderStory = {
  render: () => (
    <Layout
      style={{
        backgroundColor: "#3B1838",
        height: 500,
      }}
      hasSidebar
    >
      <Layout.Header
        style={{
          backgroundColor: "#EB4288",
        }}
      />
    </Layout>
  ),

  name: "Header",
};

export const FooterStory = {
  render: () => (
    <Layout
      style={{
        backgroundColor: "#3B1838",
        height: 500,
      }}
      hasSidebar
    >
      <Layout.Footer
        style={{
          backgroundColor: "#EB4288",
        }}
      />
    </Layout>
  ),

  name: "Footer",
};

export const SidebarStory = {
  render: () => (
    <Layout
      style={{
        backgroundColor: "#3B1838",
        height: 500,
      }}
      sidebarSize={125}
      hasFooter={false}
    >
      <Layout.Header
        style={{
          backgroundColor: "#590A42",
        }}
      />
      <Layout.Sidebar
        style={{
          backgroundColor: "#EB4288",
        }}
      />
    </Layout>
  ),

  name: "Sidebar",
};

export const ContentStory = {
  render: () => (
    <Layout
      style={{
        height: 500,
      }}
      hasSidebar={false}
      hasFooter={false}
    >
      <Layout.Header
        style={{
          backgroundColor: "#590A42",
        }}
      />
      <Layout.Content
        style={{
          backgroundColor: "#EB4288",
        }}
      />
    </Layout>
  ),

  name: "Content",
};
