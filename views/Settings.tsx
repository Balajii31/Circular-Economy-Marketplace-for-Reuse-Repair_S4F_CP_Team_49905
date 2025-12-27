import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { Card } from '../components/ui';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-slate-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
          <Monitor size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400">Customize your EcoLoop experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'light' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">Theme</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {theme === 'light' ? 'Light mode' : 'Dark mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-200 transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Account</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">Profile Information</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal details</p>
              </div>
              <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">Notification Preferences</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage how you receive updates</p>
              </div>
              <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                Configure
              </button>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Privacy & Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">Data Sharing</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Control how your data is used</p>
              </div>
              <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                Manage
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">Change Password</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Update your account password</p>
              </div>
              <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium">
                Change
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;