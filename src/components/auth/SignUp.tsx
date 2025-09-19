import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <SignUp 
          routing="path" 
          path="/sign-up" 
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-emerald-600 hover:bg-emerald-700 text-sm normal-case",
            },
          }}
        />
      </div>
    </div>
  )
}