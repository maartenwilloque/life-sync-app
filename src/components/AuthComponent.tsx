import React, { useState } from 'react';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LogOut, LogIn, AlertCircle } from 'lucide-react';

interface AuthComponentProps {
  currentUser: any;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ currentUser }) => {
  const [error, setError] = useState<string>('');

  const handleSignIn = async () => {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Sign in failed');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleSignOut = async () => {
    try {
      setError('');
      await signOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message || 'Sign out failed');
    }
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-text-secondary">{currentUser.email || currentUser.displayName}</span>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 bg-crimson hover:bg-red-700 text-bg-void px-3 py-1 rounded-md text-sm font-bold transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleSignIn}
        className="flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-3 py-1 rounded-md text-sm font-bold transition-colors"
        title="Sign in with Google"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </button>
      {error && (
        <div className="flex items-start gap-2 bg-crimson/20 border border-crimson rounded-md p-2 text-xs text-crimson">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
