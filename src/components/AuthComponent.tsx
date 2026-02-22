import React from 'react';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LogOut, LogIn } from 'lucide-react';

interface AuthComponentProps {
  currentUser: any;
}

export const AuthComponent: React.FC<AuthComponentProps> = ({ currentUser }) => {
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
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
    <button
      onClick={handleSignIn}
      className="flex items-center gap-2 bg-acid-green hover:bg-yellow-300 text-bg-void px-3 py-1 rounded-md text-sm font-bold transition-colors"
      title="Sign in with Google"
    >
      <LogIn className="w-4 h-4" />
      Sign In
    </button>
  );
};
