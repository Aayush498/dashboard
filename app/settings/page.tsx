'use client';

import React, { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Bell, Lock, Database, Mail } from 'lucide-react';

export default function SettingsPage() {
  const { theme, isDark, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const toggleSetting = (setter: any, value: any) => {
    setter(!value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Settings"
        subtitle="Configure your preferences and account settings"
      />

      <main className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Theme Settings */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground">Appearance</h2>
            <p className="text-sm text-muted-light mt-1">Customize how the dashboard looks</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">Theme</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'auto', label: 'Auto', icon: null },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {Icon && <Icon className="w-6 h-6 mx-auto mb-2 text-muted-light" />}
                      <p className="font-medium text-foreground">{label}</p>
                      {theme === value && (
                        <p className="text-xs text-primary mt-1">Selected</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Notification Settings */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-light mt-1">Manage how you receive updates</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">In-App Notifications</p>
                    <p className="text-sm text-muted-light">Receive notifications in the app</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(setNotifications, notifications)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    notifications ? 'bg-primary' : 'bg-muted-light'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium text-foreground">Email Alerts</p>
                    <p className="text-sm text-muted-light">Receive email notifications for important events</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(setEmailAlerts, emailAlerts)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    emailAlerts ? 'bg-primary' : 'bg-muted-light'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      emailAlerts ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* API & Data Settings */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground">API & Integration</h2>
            <p className="text-sm text-muted-light mt-1">Manage API keys and integrations</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  API Key
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value="••••••••••••••••••••"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="md">
                    Show
                  </Button>
                </div>
                <p className="text-xs text-muted-light mt-2">
                  Use this key to authenticate API requests
                </p>
              </div>
              <Button variant="outline">Regenerate API Key</Button>
            </div>
          </CardBody>
        </Card>

        {/* Data Management */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground">Data Management</h2>
            <p className="text-sm text-muted-light mt-1">Manage your files and data</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-accent" />
                    <p className="font-medium text-foreground">Storage Usage</p>
                  </div>
                  <span className="text-foreground font-semibold">2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '24%' }} />
                </div>
              </div>
              <Button variant="outline">Clear Cache</Button>
              <Button variant="outline" className="text-error border-error hover:bg-error/10">
                Delete All Data
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Security */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground">Security</h2>
            <p className="text-sm text-muted-light mt-1">Manage your security preferences</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-warning" />
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-light">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </CardFooter>
        </Card>

        {/* Account Settings */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground">Account</h2>
            <p className="text-sm text-muted-light mt-1">Manage your account information</p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Input label="Full Name" defaultValue="John Doe" />
              <Input label="Email" type="email" defaultValue="john@example.com" />
              <Input label="Company" defaultValue="Acme Corp" />
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="primary">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </CardFooter>
        </Card>

        {/* Danger Zone */}
        <Card variant="glass" className="border-error/50">
          <CardHeader>
            <h2 className="text-xl font-bold text-error">Danger Zone</h2>
            <p className="text-sm text-muted-light mt-1">Irreversible and destructive actions</p>
          </CardHeader>
          <CardBody>
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="outline" className="border-error text-error hover:bg-error/10">
                Delete Account
              </Button>
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
