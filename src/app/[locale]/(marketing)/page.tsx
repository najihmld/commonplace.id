import { Button } from '@/components/common/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { Badge } from '@/components/common/badge';
import {
  BookOpen,
  Search,
  FolderTree,
  Archive,
  Target,
  Map,
  Database,
  Clock,
  CheckSquare,
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield,
  Smartphone,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                priority
                alt="commonplace.id"
                src={'/logo.svg'}
                height={28}
                width={28}
                className="mx-2"
              />
              <span className="text-xl font-bold text-gray-900">
                commonplace.id{' '}
                <span className="text-xs font-semibold text-orange-600">
                  BETA
                </span>
              </span>
            </div>

            <Button asChild size="sm" className="flex items-center gap-2">
              <Link href="/auth" className="dark:text-white">
                Login / Signup
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4">
                <Zap className="mr-1 h-3 w-3" />
                Powered by the PARA Method
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Your Digital
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  &nbsp; Second Brain
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
                Transform your note-taking with the proven PARA system. Organize
                your thoughts into Projects, Areas, Resources, and Archive for
                maximum productivity and clarity.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Taking Notes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  10,000+ users
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  4.9/5 rating
                </div>
                <div className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy-first
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for organized thinking
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Powerful features designed to help you capture, organize, and
                retrieve your knowledge effortlessly.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Smart Note Creation</CardTitle>
                  <CardDescription>
                    Create rich notes with markdown support, tags, and automatic
                    categorization into your PARA structure.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Search className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Powerful Search</CardTitle>
                  <CardDescription>
                    Find any note instantly with full-text search, tag
                    filtering, and intelligent suggestions.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <FolderTree className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>PARA Organization</CardTitle>
                  <CardDescription>
                    Automatically organize your notes using the proven PARA
                    method for maximum productivity.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                    <Smartphone className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Cross-Platform Sync</CardTitle>
                  <CardDescription>
                    Access your notes anywhere with real-time synchronization
                    across all your devices.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                    <Globe className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Collaboration</CardTitle>
                  <CardDescription>
                    Share notes and collaborate with team members while
                    maintaining your personal PARA structure.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                    <Archive className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>Smart Archiving</CardTitle>
                  <CardDescription>
                    Automatically archive completed projects and inactive notes
                    to keep your workspace clean.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* PARA System Explanation */}
        <section
          id="para"
          className="bg-gradient-to-r from-blue-50 to-purple-50 py-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The PARA Method
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Created by Tiago Forte, PARA is a simple yet powerful
                organizational system that mirrors how your brain naturally
                thinks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="border-0 text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-600">Projects</CardTitle>
                  <CardDescription>
                    Things you&apos;re working on with a deadline and specific
                    outcome. Active work that needs your attention.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Map className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-600">Areas</CardTitle>
                  <CardDescription>
                    Ongoing responsibilities you want to manage over time.
                    Standards you want to maintain in your life.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <Database className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-600">Resources</CardTitle>
                  <CardDescription>
                    Topics or interests that may be useful in the future. Your
                    personal knowledge library.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Archive className="h-8 w-8 text-gray-600" />
                  </div>
                  <CardTitle className="text-gray-600">Archive</CardTitle>
                  <CardDescription>
                    Inactive items from the other three categories. Keep your
                    active workspace clean and focused.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Learn More About PARA
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Coming Soon Features */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4">
                Coming Soon
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Complete Productivity Suite
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We&apos;re building more than just a note-taking app. Get ready
                for integrated productivity tools.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Integrated Todo Lists</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        Q2 2024
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-4">
                    Transform your project notes into actionable tasks. Create
                    todo lists that automatically organize within your PARA
                    structure, with smart due dates and priority management.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Time Tracking</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        Q3 2024
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-4">
                    Track time spent on projects and areas directly from your
                    notes. Get insights into your productivity patterns and
                    optimize your workflow with detailed analytics.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="mb-4 text-sm text-gray-500">
                Be the first to know when these features launch
              </p>
              <Button>Join the Waitlist</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to organize your digital life?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join thousands of users who have transformed their productivity
                with the PARA method.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white hover:bg-white hover:text-blue-600 sm:w-auto"
                >
                  Schedule Demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-blue-200">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4 flex items-center space-x-2">
                <Image
                  priority
                  alt="commonplace.id"
                  src={'/logo-white.svg'}
                  height={28}
                  width={28}
                  className="mx-2"
                />
                <span className="text-xl font-bold">commonplace.id</span>
              </div>
              <p className="max-w-md text-gray-400">
                Transform your note-taking with the proven PARA system. Organize
                your thoughts for maximum productivity and clarity.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 sm:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} commonplace.id. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-4 sm:mt-0">
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
