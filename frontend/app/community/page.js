'use client';
import { useAuth } from '@/lib/AuthContext';
import { MessageSquare, ThumbsUp, Send } from "lucide-react";

export default function Community() {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-900 dark:text-white">Farmer Community</h1>
        <p className="text-earth-500 mt-1">Connect, share, and learn with farmers across Tamil Nadu</p>
      </div>

      {/* New Post Box */}
      <div className="bg-white dark:bg-card border border-border rounded-2xl p-4 shadow-sm mb-8">
        {user ? (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 flex-shrink-0">
              {user.name?.[0].toUpperCase()}
            </div>
            <div className="flex-grow">
              <textarea 
                className="w-full bg-earth-50 dark:bg-[#231f1d] border border-border rounded-xl p-3 focus:outline-none focus:ring-2 ring-primary-500 resize-none dark:text-white"
                placeholder="Ask a question or share an update with the community..."
                rows="3"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="bg-primary-600 text-white px-6 py-2 rounded-full font-bold hover:bg-primary-500 transition-colors shadow-sm">
                  Post
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-earth-500">
            Please log in to post to the community.
          </div>
        )}
      </div>

      {/* Empty State Feed */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-earth-50 dark:bg-earth-900/20 border border-border border-dashed rounded-2xl">
        <MessageSquare className="h-12 w-12 text-earth-400 mb-4" />
        <h3 className="text-xl font-bold text-earth-800 dark:text-white mb-2">No Posts Yet</h3>
        <p className="text-earth-500 max-w-md">Be the first to start a discussion! Share your farming experiences or ask for advice from fellow farmers.</p>
      </div>
    </div>
  );
}
