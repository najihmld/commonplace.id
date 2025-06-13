'use client';

import { Button } from '@/components/common/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { BookOpen, ArrowLeft, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';

import { signinWithGoogle } from '@/utils/supabase/actions';

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                commonplace.id
              </span>
            </Link>

            <Link
              href="/"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 bg-white shadow-2xl">
            <CardHeader className="pb-2 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Welcome to commonplace.id
              </CardTitle>
              <CardDescription className="text-base">
                Sign in or create your account to start organizing your notes
                with the PARA method
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-3 w-3 text-green-600" />
                  </div>
                  <span>Secure authentication with Google</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                    <Zap className="h-3 w-3 text-blue-600" />
                  </div>
                  <span>Instant access to PARA organization</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                    <Users className="h-3 w-3 text-purple-600" />
                  </div>
                  <span>Join 10,000+ productive users</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <Button
                onClick={signinWithGoogle}
                className="h-12 w-full border border-gray-300 bg-white text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </Button>

              {/* Privacy Notice */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Additional Info */}
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="mb-1 text-sm font-medium text-blue-800">
                  New to the PARA method?
                </p>
                <p className="text-xs text-blue-600">
                  We&apos;ll guide you through setting up your first Projects,
                  Areas, Resources, and Archive after you sign in.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Features */}
          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-gray-600">
              What you&apos;ll get access to:
            </p>
            <div className="grid grid-cols-1 gap-4 text-xs text-gray-500 sm:grid-cols-3">
              <div>
                <div className="font-medium text-gray-700">
                  Smart Organization
                </div>
                <div>Automatic PARA categorization</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Powerful Search</div>
                <div>Find any note instantly</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Cross-Platform</div>
                <div>Access from anywhere</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
