import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Row, Col } from 'antd';
import axios from 'axios';
import { UserOutlined, InboxOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useAuth } from './AuthContext';

import '../TechnicalSupportForm.css';

const { Option } = Select;

const problemCategories = [
  { value: 'account', label: 'Account Issues' },
  { value: 'payment', label: 'Payment Problems' },
  { value: 'technical', label: 'Technical Issues' },
  { value: 'gameplay', label: 'Gameplay Support' },
  { value: 'other', label: 'Other Inquiries' },
];

const TechnicalSupportForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();


  const token = localStorage.getItem("JWT");

            // Add the token to the Authorization header
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const onFinish = async (values) => {
              setLoading(true);
              try {
                // Add the token to the Authorization header
                const token = localStorage.getItem("JWT");
                const headers = {
                  Authorization: `Bearer ${token}`,
                };
            
                // Send the POST request with data and headers
                await axios.post(
                  'http://localhost:8080/api/tickets', 
                  {
                    ...values,
                    email: user?.email || '',
                    userId: user?.userId,
                  },
                  { headers } // Pass headers here as the third argument
                );
            
                message.success('Support request submitted successfully!');
                form.resetFields();
                setSubmitted(true);
              } catch (error) {
                const errorMessage = error.response?.data?.message || 
                  'You need to log in to submit a request';
                message.error(errorMessage);
              } finally {
                setLoading(false);
              }
            };
            

  if (submitted) {
    return (
      <div className="success-message">
        <SafetyCertificateOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
        <h2>Thank you for your submission!</h2>
        <p>Our team will respond to your inquiry within 24 hours.</p>
        <Button type="primary" className="submit-button" onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="support-form-container">
      <h2 className="form-title">Technical Support Request</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ problemCategory: 'account' }}
      >
        <fieldset disabled={loading}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="First Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter your first name' },
                  { min: 2, message: 'Minimum 2 characters' },
                  { max: 30, message: 'Maximum 30 characters' },
                  { pattern: /^[A-Za-z\s]+$/, message: 'Only letters allowed' }
                ]}
                hasFeedback
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="John" 
                  autoFocus 
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Last Name"
                name="surname"
                rules={[
                  { required: true, message: 'Please enter your last name' },
                  { min: 2, message: 'Minimum 2 characters' },
                  { max: 30, message: 'Maximum 30 characters' },
                  { pattern: /^[A-Za-z\s]+$/, message: 'Only letters allowed' }
                ]}
                hasFeedback
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Doe" 
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Issue Category"
            name="problemCategory"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select issue category">
              {problemCategories.map((category) => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Detailed Description"
            name="description"
            rules={[
              { required: true, message: 'Please describe your issue' },
              { min: 20, message: 'Minimum 20 characters required' },
              { max: 1000, message: 'Maximum 1000 characters' }
            ]}
            hasFeedback
          >
            <Input.TextArea
              rows={6}
              placeholder="Please describe your issue in detail..."
              showCount
              maxLength={1000}
              prefix={<InboxOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              className="submit-button"
            >
              Submit Support Request
            </Button>
          </Form.Item>
        </fieldset>
      </Form>
    </div>
  );
};

export default TechnicalSupportForm;