import React, { useState } from 'react';
import { ViewState } from '../types';
import { Button, Input, Card } from '../components/UIComponents';

interface AuthProps {
  view: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogin: (name: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ view, onChangeView, onLogin }) => {
  const isLogin = view === ViewState.LOGIN;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', company: '', phone: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        if (formData.email && formData.password) {
            onLogin("Phoenix Enterprises");
        } else {
            setError("Please fill in all fields.");
        }
      } else {
          // Register logic
          if (formData.password !== formData.confirmPassword) {
              setError("Passwords do not match.");
              return;
          }
          onLogin(formData.company || "New Business User");
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg border-t-4 border-t-[#5514B4] dark:border-t-[#6366f1]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#5514B4] dark:text-[#f9fafb] mb-2">{isLogin ? 'Welcome Back' : 'Join BT Business'}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Manage your services and orders.' : 'Get started with business-grade connectivity.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
                <Input 
                    label="Company Name" 
                    name="company" 
                    placeholder="e.g. Acme Ltd" 
                    value={formData.company}
                    onChange={handleChange}
                    required
                />
                <Input 
                    label="Contact Phone" 
                    name="phone" 
                    type="tel"
                    placeholder="07700 900000" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </>
          )}
          
          <Input 
            label="Email Address" 
            name="email" 
            type="email" 
            placeholder="name@company.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input 
            label="Password" 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <Input 
                label="Confirm Password" 
                name="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
          )}

          {/* Validation Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-md">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {!isLogin && (
              <div className="flex items-center">
                  <input id="terms" type="checkbox" className="h-4 w-4 text-[#5514B4] focus:ring-[#5514B4] border-gray-300 dark:border-[#4c1d95] rounded bg-white dark:bg-[#1a003a]" required />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      I agree to the <a href="#" className="text-[#5514B4] dark:text-[#f9fafb] hover:underline">Terms & Conditions</a>
                  </label>
              </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm font-medium text-[#5514B4] dark:text-[#f9fafb] hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => onChangeView(isLogin ? ViewState.REGISTER : ViewState.LOGIN)}
              className="font-semibold text-[#5514B4] dark:text-[#f9fafb] hover:text-[#330072] transition-colors"
            >
              {isLogin ? 'Register now' : 'Log in here'}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};