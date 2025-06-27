import React, { useState, useEffect } from 'react';
import { Card, Button, Switch, Space, Typography, Upload, message, Row, Col, Tag } from 'antd';
import { FilePdfOutlined, UploadOutlined, GithubOutlined, ZoomInOutlined, CodeOutlined, UserOutlined } from '@ant-design/icons';
import { ReactIPdfViewerLite } from 'react-ipdf-viewer-lite';
import axios from 'axios';
import './DemoDashboard.scss';
import pdf1 from "../assets/Get_Started_With_Smallpdf.pdf"
import pdf2 from "../assets/sample.pdf";
import pdf3 from "../assets/dummy (1).pdf"

const { Title, Text, Paragraph } = Typography;

interface PdfFile {
  id: string;
  url: string;
}

const samplePdfs: PdfFile[] = [
  { id: '1', url: pdf1 },
  { id: '2', url: pdf2 },
  { id: '3', url: pdf3 },
];

const highlights = [
  { title: 'Effortless Integration', text: 'Import ReactIPdfViewerLite, pass an src prop (URL, file, or base64), and display PDFs instantly.', icon: <FilePdfOutlined /> },
  { title: 'Feature-Rich Experience', text: 'Zoom, full-screen, themes, and TypeScript support for a powerful yet simple PDF viewer.', icon: <ZoomInOutlined /> },
  { title: 'Built for Accessibility', text: 'Transparent text layers enable screen readers, making PDFs inclusive for all users.', icon: <UserOutlined /> },
  { title: 'Open and Collaborative', text: 'Free, open-source under MIT, inviting contributions to drive community progress.', icon: <GithubOutlined /> },
];

const DemoDashboard: React.FC = () => {
  const [pdfTheme, setPdfTheme] = useState<'light' | 'dark'>('light');
  const [selectedPdf, setSelectedPdf] = useState<string>(samplePdfs[0].url);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [downloads, setDownloads] = useState<number>(0);

  useEffect(() => {
    axios
      .get('https://api.npmjs.org/downloads/point/last-month/react-ipdf-viewer-lite')
      .then((response) => setDownloads(response.data.downloads))
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Update the document's data-theme attribute for CSS
    document.documentElement.setAttribute('data-theme', pdfTheme);
    console.log('Theme changed to:', pdfTheme);
  }, [pdfTheme]);

  const toggleTheme = () => {
    setPdfTheme(pdfTheme === 'light' ? 'dark' : 'light');
  };

  const handlePdfSelect = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setUploadError(null);
  };

  const handleUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      setUploadError('Please upload a valid PDF file.');
      return false;
    }
    setUploadError(null);
    const fileUrl = URL.createObjectURL(file);
    setSelectedPdf(fileUrl);
    message.success('PDF uploaded successfully!', 3);
    return false;
  };

  return (
    <div className="demo-dashboard">
      <header className="hero">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            react-ipdf-viewer-lite
          </Title>
          <Paragraph className="hero-subtitle">
            Effortlessly render PDFs in React with a lightweight, customizable viewer powered by Mozilla’s pdf.js.
          </Paragraph>
          <Space size="large" className="hero-actions">
            <Button
              className="custom-button primary"
              size="large"
              icon={<CodeOutlined />}
              href="https://www.npmjs.com/package/react-ipdf-viewer-lite"
              target="_blank"
            >
              npm install
            </Button>
            <Button
              className="custom-button secondary"
              size="large"
              icon={<GithubOutlined />}
              href="https://github.com/Sudeepa-R/react-ipdf-viewer-lite"
              target="_blank"
            >
              GitHub
            </Button>
          </Space>
          <Space className="hero-stats">
            <Tag style={{ marginLeft: '15px' }} color="blue">Downloads: {downloads} / mo</Tag>
            <Tag color="green">MIT License</Tag>
          </Space>
        </div>
      </header>
      <main className="main-content">
        <section className="summary-section">
          <Title level={3}>Why react-ipdf-viewer-lite?</Title>
          <Paragraph className="summary-text">
            <strong>react-ipdf-viewer-lite</strong> is your go-to solution for displaying PDFs in React apps. With a simple API, robust features, and accessibility at its core, it’s built to make your development process smooth and your PDFs inclusive. Open-source and community-driven, it’s ready for your next project.
          </Paragraph>
        </section>
        <section className="demo-section">
          <Title level={3}>Explore the Viewer</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={18}>
              <Card className={`pdf-viewer-card ${pdfTheme}`} style={{ height: '95vh', width: '90%' }}>
                <ReactIPdfViewerLite
                  key={pdfTheme} // Force re-render on theme change
                  src={selectedPdf}
                  theme={pdfTheme}
                />
              </Card>
            </Col>
            <Col xs={24} lg={6}>
              <Card className="controls-card" title="Viewer Controls">
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Space>
                    <Text>Viewer Theme:</Text>
                    <Switch
                      checked={pdfTheme === 'dark'}
                      onChange={toggleTheme}
                      checkedChildren="Dark"
                      unCheckedChildren="Light"
                    />
                  </Space>
                  <Space wrap>
                    <Text>Sample PDFs:</Text>
                    {samplePdfs.map((pdf) => (
                      <Button
                        key={pdf.id}
                        className={`custom-button ${selectedPdf === pdf.url ? 'primary' : 'secondary'}`}
                        onClick={() => handlePdfSelect(pdf.url)}
                        icon={<FilePdfOutlined />}
                      >
                        PDF {pdf.id}
                      </Button>
                    ))}
                  </Space>
                  <Space direction="vertical">
                    <Text>Upload PDF:</Text>
                    <Upload
                      accept="application/pdf"
                      beforeUpload={handleUpload}
                      showUploadList={false}
                    >
                      <Button className="custom-button secondary" icon={<UploadOutlined />}>
                        Upload PDF
                      </Button>
                    </Upload>
                    {uploadError && <Text type="danger">{uploadError}</Text>}
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </section>
        <section className="highlights-section">
          <Title level={3}>What Makes It Stand Out</Title>
          <Row gutter={[16, 16]}>
            {highlights.map((highlight, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card className="highlight-card">
                  <Space direction="vertical" align="center">
                    <span className="highlight-icon">{highlight.icon}</span>
                    <Text strong className="highlight-title">{highlight.title}</Text>
                    <Text className="highlight-text">{highlight.text}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </main>
      <footer className="footer">
        <Text style={{ color: '#fff', fontSize: '22px' }}>
          Crafted by <a href="https://github.com/Sudeepa-R" target="_blank"><span style={{ fontSize: '28px', fontWeight: '500' }}>Sudeep R</span></a> |{' '}
          <a href="https://github.com/Sudeepa-R/react-ipdf-viewer-lite/blob/main/LICENSE" target="_blank">
            <span>MIT License</span>
          </a>
        </Text>
      </footer>
    </div>
  );
};

export default DemoDashboard;