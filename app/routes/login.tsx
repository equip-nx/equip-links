import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <main className="max-w-7xl mx-auto mt-8 px-2 sm:px-6 lg:px-8">
      <Form action="/auth/google" method="post" className="w-full text-center">
        <button>
          <img className="h-12" src={require('../../public/google-btn.png')} alt="Sign in with Google" />
        </button>
      </Form>
    </main>
  )
}