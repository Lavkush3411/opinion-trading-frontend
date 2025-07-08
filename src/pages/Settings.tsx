import React from "react";
import { Layout, Typography, Select, Tooltip } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const SettingsPage = () => {
  return (
    <Layout
      style={{
        backgroundColor: "rgb(17, 24, 39)", // Tailwind's gray-900
        padding: "3rem 2rem",
        color: "white",
      }}
    >
      <Content>
        {/* Page title */}
        <Title level={2} style={{ color: "white", marginBottom: "2rem" }}>
          Settings
        </Title>

        {/* Section: General */}
        <div style={{ marginBottom: "3rem" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: 16,
              display: "block",
            }}
          >
            General
          </Text>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Preferred Language */}
            <div>
              <Text
                style={{ fontSize: 14, color: "#d1d5db" }}
                className="flex "
              >
                Preferred Language
              </Text>
              <Tooltip title="Language selection will be available soon.">
                <Select
                  defaultValue="en"
                  disabled
                  style={{
                    marginTop: 8,
                    width: 320,
                    backgroundColor: "#111827",
                    borderColor: "#374151",
                    color: "white",
                  }}
                  dropdownStyle={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                  options={[
                    { label: "English", value: "en" },
                    { label: "Hindi", value: "hi" },
                    { label: "Spanish", value: "es" },
                  ]}
                />
              </Tooltip>
            </div>

            {/* Theme Preference */}
            <div>
              <Text
                style={{ fontSize: 14, color: "#d1d5db" }}
                className="flex "
              >
                Theme Preference
              </Text>
              <Tooltip title="Theme customization will be available soon.">
                <Select
                  defaultValue="dark"
                  disabled
                  style={{
                    marginTop: 8,
                    width: 320,
                    backgroundColor: "#111827",
                    borderColor: "#374151",
                    color: "white",
                  }}
                  dropdownStyle={{
                    backgroundColor: "#1f2937",
                    color: "white",
                  }}
                  options={[
                    { label: "Dark", value: "dark" },
                    { label: "Light", value: "light" },
                    { label: "System Default", value: "system" },
                  ]}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default SettingsPage;
