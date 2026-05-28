'use client';

import React, { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do I upload and analyze my policy data?',
    answer:
      'Navigate to the Dashboard and use the file upload section to select your CSV or XLSX file. The system will automatically process your data and generate AI-powered insights within minutes.',
  },
  {
    id: 2,
    question: 'What file formats are supported?',
    answer: 'We support CSV (.csv) and Excel (.xlsx) file formats. Maximum file size is 100MB.',
  },
  {
    id: 3,
    question: 'Can I export the analysis results?',
    answer: 'Yes! You can export analysis results as PDF, CSV, Excel, or PNG. Use the Export button in the results section.',
  },
  {
    id: 4,
    question: 'How is my data secure?',
    answer: 'All data is encrypted in transit and at rest. We follow HIPAA compliance standards and never share your data with third parties.',
  },
  {
    id: 5,
    question: 'Can I compare multiple datasets?',
    answer: 'Yes! Upload multiple files and use the comparison view in Analytics to see side-by-side analysis.',
  },
  {
    id: 6,
    question: 'How often is the AI model updated?',
    answer: 'Our AI models are continuously trained and updated weekly to ensure accuracy and relevance.',
  },
];

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of the Payer Policy Intelligence Dashboard',
    topics: [
      'Creating your account',
      'Setting up your workspace',
      'Uploading your first file',
      'Understanding the dashboard',
    ],
  },
  {
    title: 'Advanced Features',
    description: 'Master advanced tools and capabilities',
    topics: [
      'Comparison analysis',
      'Custom report generation',
      'API integration',
      'Data export options',
    ],
  },
  {
    title: 'Analytics & Insights',
    description: 'Deep-dive into data analysis features',
    topics: [
      'Trend analysis',
      'Statistical summaries',
      'Predictive insights',
      'Benchmark comparisons',
    ],
  },
  {
    title: 'Account & Settings',
    description: 'Manage your account and preferences',
    topics: [
      'Profile settings',
      'Security options',
      'Notification preferences',
      'Data privacy',
    ],
  },
];

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Help & Documentation"
        subtitle="Get support and learn how to use the Payer Policy Intelligence Dashboard"
      />

      <main className="p-6 max-w-4xl mx-auto space-y-12">
        {/* Search Section */}
        <div>
          <Input
            placeholder="Search help articles and FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
        </div>

        {/* Quick Start */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: '1', title: 'Upload', desc: 'Select your CSV or XLSX file' },
              { num: '2', title: 'Process', desc: 'AI analyzes your data' },
              { num: '3', title: 'Analyze', desc: 'View results and insights' },
              { num: '4', title: 'Export', desc: 'Download your reports' },
            ].map((step) => (
              <Card key={step.num} variant="glass">
                <CardBody>
                  <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-light mt-2">{step.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Guides */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Learning Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Card key={guide.title} variant="glass">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-foreground">{guide.title}</h3>
                  <p className="text-sm text-muted-light mt-2">{guide.description}</p>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-2">
                    {guide.topics.map((topic) => (
                      <li key={topic} className="text-sm text-muted-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4" fullWidth>
                    View Guide
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions {searchQuery && `(${filteredFaqs.length} results)`}
          </h2>
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <Card
                  key={faq.id}
                  variant="glass"
                  className="cursor-pointer hover:border-primary transition-all"
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                >
                  <CardBody>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-light flex-shrink-0 transition-transform ${
                          openFAQ === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {openFAQ === faq.id && (
                      <p className="text-muted-light mt-4 leading-relaxed">{faq.answer}</p>
                    )}
                  </CardBody>
                </Card>
              ))
            ) : (
              <Card variant="glass" className="text-center py-8">
                <p className="text-muted-light">No FAQs match your search.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <Card variant="glass" className="border-primary/20 bg-primary/5">
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground">Need More Help?</h2>
            <p className="text-muted-light mt-2">
              Can&apos;t find what you&apos;re looking for? Our support team is ready to help.
            </p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
                <p className="text-sm text-muted-light">support@policyai.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                <p className="text-sm text-muted-light">Available 9 AM - 6 PM EST</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Documentation</h3>
                <p className="text-sm text-muted-light">docs.policyai.com</p>
              </div>
            </div>
            <Button variant="primary" className="mt-6">
              Contact Support
            </Button>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
