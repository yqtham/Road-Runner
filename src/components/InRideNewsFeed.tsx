import React, { useState } from 'react';
import { IN_RIDE_NEWS } from '../data/mockData';
import { NewsItem } from '../types';
import {
  Newspaper,
  Volume2,
  VolumeX,
  BookOpen,
  Share2,
  Bookmark,
  ExternalLink,
  Sparkles,
  TrendingUp,
  X,
  Check,
  CheckCheck,
  Mail,
  SlidersHorizontal,
  Send,
  Eye,
} from 'lucide-react';

interface AvailableTopic {
  id: string;
  name: string;
  category: string;
  count: number;
  description: string;
}

export const InRideNewsFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['news_1']);

  // --- Newsletter Topic Shortlisting State ---
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [deliveryFrequency, setDeliveryFrequency] = useState<'morning_rush' | 'evening_commute' | 'weekly'>('morning_rush');
  const [isSentSuccess, setIsSentSuccess] = useState(false);
  const [showNewsletterPreview, setShowNewsletterPreview] = useState(false);

  // Available topics for user shortlisting
  const availableTopics: AvailableTopic[] = [
    { id: 'economy', name: 'SG Economy & MAS Policy', category: 'economy', count: 12, description: 'Interest rates, GDP growth, currency bands & inflation updates' },
    { id: 'tech', name: 'Tech, AI & Smart Mobility', category: 'tech', count: 16, description: 'EV charging, autonomous transit, startups & venture deals' },
    { id: 'food', name: 'Michelin & Hawker Culture', category: 'food', count: 24, description: 'Hidden coffee gems, heritage stalls, Maxwell & Amoy street buzz' },
    { id: 'travel', name: 'Changi Airport & Regional Trips', category: 'travel', count: 9, description: 'Flight promos, Changi Jewel updates, weekend Johor/Bintan routes' },
    { id: 'local', name: 'Local Trails & Urban Parks', category: 'local', count: 14, description: 'Rail Corridor, cycling connectors, coastal strolls & heritage architecture' },
    { id: 'finance', name: 'CPF & Financial Independence', category: 'economy', count: 8, description: 'Personal finance, savings yields, property cooling measures' },
  ];

  // User's shortlisted topic IDs (defaults to 3 key areas)
  const [shortlistedTopicIds, setShortlistedTopicIds] = useState<string[]>(['economy', 'tech', 'food']);

  const toggleShortlistTopic = (topicId: string) => {
    setShortlistedTopicIds((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const categories = [
    { id: 'all', label: 'All Headlines' },
    { id: 'shortlisted', label: `My Shortlisted Topics (${shortlistedTopicIds.length})` },
    { id: 'economy', label: 'SG Economy' },
    { id: 'tech', label: 'Tech & Mobility' },
    { id: 'food', label: 'Hawker & Food' },
    { id: 'travel', label: 'Travel & Changi' },
    { id: 'local', label: 'Local Life' },
  ];

  // Filter news: when 'shortlisted' tab is chosen, filter by user's shortlisted topic categories
  const filteredNews = IN_RIDE_NEWS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'shortlisted') {
      return shortlistedTopicIds.includes(item.category);
    }
    return item.category === activeCategory;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      alert('Please enter your email to receive your personalized Road Runner newsletter!');
      return;
    }
    setIsSentSuccess(true);
    setTimeout(() => {
      setIsSentSuccess(false);
      setShowNewsletterPreview(false);
      setIsCustomizeOpen(false);
    }, 3000);
  };

  return (
    <section id="news_feed" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Road Runner Digest</span>
              <span aria-hidden="true">·</span>
              <span>Personalised In-Ride News Feed</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Curated In-Transit Newsletter & Audio Briefing
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Shortlist topics you care about. We tailor bite-sized digests perfectly timed for your morning and evening taxi commutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Topic Shortlist & Customize Button */}
            <button
              onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400 dark:text-amber-600" />
              <span>Personalize Newsletter Topics ({shortlistedTopicIds.length})</span>
            </button>

            {/* Audio Listening Toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <Volume2 className={`h-4 w-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>{isPlayingAudio ? 'Audio Playing' : 'Listen In-Car'}</span>
            </button>
          </div>
        </div>

        {/* --- Interactive Newsletter Topic Shortlisting Panel --- */}
        {isCustomizeOpen && (
          <div className="mb-8 rounded-3xl border border-amber-300 bg-amber-50/70 p-6 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/20 text-slate-900 dark:text-white">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Topic Shortlist Manager
                </span>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  Choose the topics to include in your daily Road Runner Newsletter
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Click any topic below to shortlist or remove it from your personalized in-ride briefing.
                </p>
              </div>

              <button
                onClick={() => setIsCustomizeOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="Close customizer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Topic Toggles Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableTopics.map((topic) => {
                const isShortlisted = shortlistedTopicIds.includes(topic.id);
                return (
                  <button
                    key={topic.id}
                    onClick={() => toggleShortlistTopic(topic.id)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      isShortlisted
                        ? 'border-amber-500 bg-white dark:bg-slate-900 shadow-sm ring-1 ring-amber-500'
                        : 'border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/60 opacity-80 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isShortlisted
                          ? 'border-amber-500 bg-amber-500 text-slate-950 font-bold'
                          : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800'
                      }`}
                    >
                      {isShortlisted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {topic.name}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {topic.description}
                      </p>
                      <span className="mt-2 inline-block text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        {isShortlisted ? '✓ Shortlisted for Digest' : '+ Tap to shortlist'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Newsletter Subscription & Delivery Frequency */}
            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-t border-amber-200 pt-5 dark:border-amber-900/50">
              {/* Delivery Frequency Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Commute Delivery:
                </span>
                <div className="flex items-center gap-1 rounded-xl bg-white p-1 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-xs">
                  <button
                    onClick={() => setDeliveryFrequency('morning_rush')}
                    className={`rounded-lg px-2.5 py-1 font-medium transition-all ${
                      deliveryFrequency === 'morning_rush'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Morning Rush (7:30 AM)
                  </button>
                  <button
                    onClick={() => setDeliveryFrequency('evening_commute')}
                    className={`rounded-lg px-2.5 py-1 font-medium transition-all ${
                      deliveryFrequency === 'evening_commute'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Evening Ride (6:00 PM)
                  </button>
                  <button
                    onClick={() => setDeliveryFrequency('weekly')}
                    className={`rounded-lg px-2.5 py-1 font-medium transition-all ${
                      deliveryFrequency === 'weekly'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Weekend Explorer
                  </button>
                </div>
              </div>

              {/* Action Buttons: Preview or Send */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNewsletterPreview(!showNewsletterPreview)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview Custom Newsletter</span>
                </button>

                <button
                  onClick={() => {
                    setActiveCategory('shortlisted');
                    setIsCustomizeOpen(false);
                  }}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors"
                >
                  Apply & Filter Feed ({shortlistedTopicIds.length} topics)
                </button>
              </div>
            </div>

            {/* Newsletter Interactive Live Preview */}
            {showNewsletterPreview && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white shadow-md">
                <div className="border-b border-slate-200 pb-3 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                      Live Sample Preview · Edition #284
                    </span>
                    <h4 className="text-base font-bold">
                      Your Road Runner Morning Commuter Digest
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Estimated Ride Time: 18 mins
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Curated exclusively based on your {shortlistedTopicIds.length} shortlisted topics:{' '}
                    <strong>{shortlistedTopicIds.join(', ')}</strong>
                  </div>

                  {filteredNews.slice(0, 3).map((item, idx) => (
                    <div key={item.id} className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 text-xs">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold mb-1">
                        <span>Story {idx + 1}: {item.category.toUpperCase()}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.readTimeMinutes} min read</span>
                      </div>
                      <h5 className="font-bold text-slate-900 dark:text-white">{item.title}</h5>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">{item.summary}</p>
                    </div>
                  ))}
                </div>

                {/* Email Dispatch Form */}
                <form onSubmit={handleSendNewsletter} className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="relative w-full sm:w-80">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email for daily commute push"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 transition-colors w-full sm:w-auto justify-center"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Daily Newsletter to Me</span>
                  </button>
                </form>

                {isSentSuccess && (
                  <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ Success! Today's customized newsletter has been scheduled to {userEmail}.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Audio Player Banner when active */}
        {isPlayingAudio && (
          <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-xs dark:border-amber-900/60 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Now Playing: Road Runner Daily 3-Minute Singapore Briefing</div>
                <div className="text-xs text-amber-800 dark:text-amber-300">
                  Covering your shortlisted topics: {shortlistedTopicIds.join(', ')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="flex items-end gap-1 h-5">
                <span className="w-1 bg-amber-600 animate-pulse h-3 rounded-full" />
                <span className="w-1 bg-amber-600 animate-pulse h-5 rounded-full" />
                <span className="w-1 bg-amber-600 animate-pulse h-2 rounded-full" />
                <span className="w-1 bg-amber-600 animate-pulse h-4 rounded-full" />
              </div>

              <button
                onClick={() => setIsPlayingAudio(false)}
                className="rounded-lg bg-white/80 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white"
              >
                Pause Audio
              </button>
            </div>
          </div>
        )}

        {/* Category Filters: Clean segmented tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Shortlist active indicator */}
        {activeCategory === 'shortlisted' && (
          <div className="mt-3 flex items-center justify-between text-xs text-amber-700 dark:text-amber-400">
            <span>Showing stories matching your active shortlist: {shortlistedTopicIds.join(', ')}</span>
            <button
              onClick={() => setIsCustomizeOpen(true)}
              className="underline font-semibold hover:text-amber-900 dark:hover:text-amber-300"
            >
              Modify Shortlist Topics
            </button>
          </div>
        )}

        {/* News Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No articles found in this category.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-2 text-xs text-amber-600 underline font-medium"
              >
                Show all news headlines
              </button>
            </div>
          ) : (
            filteredNews.map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);
              const isShortlistedCategory = shortlistedTopicIds.includes(article.category);

              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`group cursor-pointer rounded-2xl border p-5 transition-all hover:shadow-md flex flex-col justify-between ${
                    isShortlistedCategory
                      ? 'border-amber-200/90 bg-white hover:border-amber-400 dark:border-amber-900/40 dark:bg-slate-900'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          {article.category}
                        </span>
                        {isShortlistedCategory && (
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            ★ Shortlisted
                          </span>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{article.readTimeMinutes} min read</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.publishedAgo}</span>
                      </div>

                      <button
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className={`rounded-full p-1 transition-colors ${
                          isBookmarked ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Save article'}
                      >
                        <Bookmark className="h-4 w-4 fill-current" />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800 text-xs">
                    <span className="font-medium text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                      {article.source}
                    </span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Read in transit</span>
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sponsor Banner (Monetization: "Advertising space from our digital anchor platform") */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shadow-sm dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span>Featured Anchor Sponsor</span>
                <span aria-hidden="true">·</span>
                <span>CBD Dining & Airport Privilege</span>
              </div>
              <h3 className="mt-1 text-lg font-bold">
                Marina Bay Sands Rooftop Culinary Pass & Lounge Access
              </h3>
              <p className="mt-1 text-xs text-slate-300 max-w-xl">
                Road Runner riders enjoy 15% off at select rooftop restaurants when presenting their verified trip receipt.
              </p>
            </div>

            <button
              onClick={() => alert('Sponsor deal redeemed! Present your Road Runner booking ID at venue.')}
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shrink-0 whitespace-nowrap"
            >
              Claim Commuter Privilege
            </button>
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {selectedArticle.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.readTimeMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>Source: {selectedArticle.source}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {selectedArticle.title}
            </h2>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/50 dark:border-slate-800 text-xs italic text-slate-700 dark:text-slate-300">
              "{selectedArticle.summary}"
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>{selectedArticle.fullContent}</p>
              <p>
                As part of the Road Runner content partnership network, verified articles are updated hourly via news aggregation feeds, keeping commuters informed without cognitive overload.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                onClick={() => alert('Article saved to your offline reading list!')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                <Bookmark className="h-4 w-4" />
                <span>Save Offline</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
              >
                Back to Digest
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
