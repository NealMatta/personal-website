import { login, logout } from './actions';
import { createClient } from '@/src/lib/supabase/auth/server';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="flex items-center justify-center p-4 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {error || !data?.user ? (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Login
            </h1>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                formAction={login}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Log in
              </button>
            </form>
          </>
        ) : (
          <form>
            <h1 className="text-2xl font-bold text-center text-green-700">
              You are logged in!
            </h1>
            <button
              formAction={logout}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Log Out
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
