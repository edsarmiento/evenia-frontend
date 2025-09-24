import { Card } from '@/components/ui/Card'

export default function About() {
  return (
    <div className="px-4 py-8 sm:px-0">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About This Project</h1>
        
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-4">
              This is a clean and simple Next.js application built with TypeScript and modern best practices. 
              It demonstrates a well-structured project setup with proper tooling and conventions.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Next.js 14 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>ESLint and Prettier for code quality</li>
              <li>React 18 with Server Components</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Modern App Router architecture</li>
              <li>TypeScript configuration with path aliases</li>
              <li>Responsive design with Tailwind CSS</li>
              <li>Reusable component library</li>
              <li>Code formatting and linting setup</li>
              <li>Clean project structure</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
