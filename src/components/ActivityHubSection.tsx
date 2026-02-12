import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Download, ExternalLink, Github, Headphones, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SpotifyTrack {
  title: string;
  artist: string;
  albumArtUrl: string;
  songUrl: string;
  playedAt: string;
}

interface WeatherSnapshot {
  temperatureF: number;
  temperatureC: number;
  weatherLabel: string;
  windMph: number;
}

const GITHUB_USERNAME = 'T-Joseph-Kim';
const SPOTIFY_RECENT_ENDPOINT =
  (import.meta.env.VITE_SPOTIFY_RECENT_ENDPOINT as string | undefined) ?? '/api/spotify/recently-played';
const LIKE_NAMESPACE = 't-joseph-kim-portfolio';
const LIKE_KEY = 'activity-hub-likes';
const LIKE_STORAGE_KEY = 'activity_hub_likes';

const getSpotifyTrackId = (songUrl: string): string | null => {
  const match = songUrl.match(/track\/([A-Za-z0-9]+)/);
  return match?.[1] ?? null;
};

const toWeatherLabel = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if ([1, 2].includes(code)) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain';
  if ([71, 73, 75, 77].includes(code)) return 'Snow';
  if ([80, 81, 82].includes(code)) return 'Rain showers';
  if ([85, 86].includes(code)) return 'Snow showers';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Unknown';
};

function ActivityHubSection(): React.JSX.Element {
  const { isDarkMode } = useTheme();
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState<boolean>(Boolean(SPOTIFY_RECENT_ENDPOINT));
  const [graphSrc, setGraphSrc] = useState<string>(`https://github.com/users/${GITHUB_USERNAME}/contributions`);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);

  const saveLocalLikes = (value: number): void => {
    try {
      localStorage.setItem(LIKE_STORAGE_KEY, String(value));
    } catch {
      // Ignore storage errors and keep in-memory count.
    }
  };

  useEffect(() => {
    if (!SPOTIFY_RECENT_ENDPOINT) return;

    let isMounted = true;

    const loadTrack = async (): Promise<void> => {
      try {
        const response = await fetch(SPOTIFY_RECENT_ENDPOINT);
        if (!response.ok) throw new Error('Could not fetch latest track');
        const data = (await response.json()) as SpotifyTrack;
        if (!isMounted) return;
        setTrack(data);
      } catch {
        if (!isMounted) return;
        setTrack(null);
      } finally {
        if (isMounted) setIsLoadingTrack(false);
      }
    };

    loadTrack();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadLikes = async (): Promise<void> => {
      try {
        const response = await fetch(`https://api.countapi.xyz/get/${LIKE_NAMESPACE}/${LIKE_KEY}`);
        if (!response.ok) throw new Error('Could not load like count');
        const data = (await response.json()) as { value?: number };
        if (!isMounted) return;
        const value = typeof data.value === 'number' ? data.value : 0;
        setLikeCount(value);
        saveLocalLikes(value);
      } catch {
        if (!isMounted) return;
        const localValue = Number(localStorage.getItem(LIKE_STORAGE_KEY) ?? '0');
        setLikeCount(Number.isFinite(localValue) ? localValue : 0);
      }
    };

    loadLikes();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async (): Promise<void> => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=29.6516&longitude=-82.3248&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/New_York'
        );
        if (!response.ok) throw new Error('Could not load weather');
        const data = (await response.json()) as {
          current?: {
            temperature_2m?: number;
            weather_code?: number;
            wind_speed_10m?: number;
          };
        };
        if (!isMounted) return;
        const tempF = data.current?.temperature_2m;
        const weatherCode = data.current?.weather_code;
        const windMph = data.current?.wind_speed_10m;
        if (typeof tempF !== 'number' || typeof weatherCode !== 'number' || typeof windMph !== 'number') {
          throw new Error('Invalid weather payload');
        }

        setWeather({
          temperatureF: tempF,
          temperatureC: (tempF - 32) * (5 / 9),
          weatherLabel: toWeatherLabel(weatherCode),
          windMph,
        });
      } catch {
        if (!isMounted) return;
        setWeather(null);
      } finally {
        if (isMounted) setIsLoadingWeather(false);
      }
    };

    loadWeather();
    const interval = window.setInterval(loadWeather, 10 * 60 * 1000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const addLike = async (): Promise<void> => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const response = await fetch(`https://api.countapi.xyz/hit/${LIKE_NAMESPACE}/${LIKE_KEY}`);
      if (!response.ok) throw new Error('Could not increment like count');
      const data = (await response.json()) as { value?: number };
      const value = typeof data.value === 'number' ? data.value : likeCount + 1;
      setLikeCount(value);
      saveLocalLikes(value);
    } catch {
      const value = likeCount + 1;
      setLikeCount(value);
      saveLocalLikes(value);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div
      className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14"
      style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="mb-8 flex flex-col items-center gap-4 md:items-start lg:flex-row lg:items-end lg:justify-between">
        <div className="text-center md:text-left">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Activity Hub
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A single dashboard with what I am building and listening to!
          </p>
        </div>

        <a
          href="/resume.pdf"
          download="TJosephKim_Resume.pdf"
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-transform transition-colors duration-200 hover:scale-105 ${
            isDarkMode
              ? 'border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.10]'
              : 'border-black/20 bg-black/[0.03] text-gray-900 hover:bg-black/[0.08]'
          }`}
        >
          <Download className="h-4 w-4" />
          Download Resume
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`relative overflow-hidden rounded-[28px] border p-4 sm:p-6 ${
          isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]'
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-28 -top-24 h-64 w-64 rounded-full blur-3xl ${
            isDarkMode ? 'bg-sky-400/15' : 'bg-blue-500/15'
          }`}
        />

        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <article
            className={`rounded-2xl border p-3 sm:p-4 lg:col-span-8 lg:row-start-2 lg:min-h-[170px] transition-transform duration-300 hover:scale-[1.01] ${
              isDarkMode ? 'border-white/10 bg-black/30' : 'border-black/10 bg-white/70'
            }`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <h3 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  GitHub Contribution Graph
                </h3>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 text-sm font-semibold ${
                  isDarkMode ? 'text-sky-300 hover:text-sky-200' : 'text-blue-700 hover:text-blue-900'
                }`}
              >
                Visit Profile <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className={`overflow-hidden rounded-xl border p-3 ${isDarkMode ? 'border-white/10 bg-black/40' : 'border-black/10 bg-white'}`}>
              <img
                src={graphSrc}
                alt={`${GITHUB_USERNAME} GitHub contribution graph`}
                className="mx-auto h-auto w-auto max-w-full"
                loading="lazy"
                decoding="async"
                onError={() => {
                  setGraphSrc(`https://ghchart.rshah.org/${GITHUB_USERNAME}`);
                }}
              />
            </div>
          </article>

          <article
            className={`rounded-2xl border p-3 sm:p-4 lg:col-span-8 lg:row-start-1 lg:min-h-[240px] transition-transform duration-300 hover:scale-[1.01] ${
              isDarkMode ? 'border-white/10 bg-black/30' : 'border-black/10 bg-white/70'
            }`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recently Played</h3>
              </div>
              {!isLoadingTrack && track && (
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{track.playedAt}</span>
              )}
            </div>

            {isLoadingTrack && (
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading latest Spotify track...</p>
            )}

            {!isLoadingTrack && track && (
              <div
                className={`group block rounded-2xl border p-4 transition-colors ${
                  isDarkMode
                    ? 'border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 via-white/[0.03] to-white/[0.03] hover:bg-white/[0.08]'
                    : 'border-emerald-700/20 bg-gradient-to-br from-emerald-500/10 via-black/[0.01] to-black/[0.03] hover:bg-black/[0.07]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={track.songUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`ml-auto text-xs font-semibold ${isDarkMode ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-700 hover:text-emerald-900'}`}
                  >
                    Open in Spotify
                  </a>
                </div>

                {getSpotifyTrackId(track.songUrl) && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-emerald-400/20">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${getSpotifyTrackId(track.songUrl)}?utm_source=generator&theme=${isDarkMode ? '0' : '1'}`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`${track.title} Spotify embed`}
                    />
                  </div>
                )}
              </div>
            )}

            {!isLoadingTrack && !track && (
              <div className={`rounded-xl border p-3 text-sm ${isDarkMode ? 'border-white/10 bg-white/[0.04] text-gray-300' : 'border-black/10 bg-black/[0.03] text-gray-700'}`}>
                Set <code>VITE_SPOTIFY_RECENT_ENDPOINT</code> to show your live recently played song.
              </div>
            )}
          </article>

          <article
            className={`rounded-2xl border p-3 sm:p-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:min-h-[150px] transition-transform duration-300 hover:scale-[1.01] ${
              isDarkMode ? 'border-white/10 bg-black/30' : 'border-black/10 bg-white/70'
            }`}
          >
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community Likes</h3>
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tap the heart to leave a like.</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative group">
                <button
                  type="button"
                  onClick={addLike}
                  disabled={isLiking}
                  aria-label="Add a like"
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-200 hover:scale-105 active:scale-95 ${
                    isDarkMode
                      ? 'border-white/20 bg-white/[0.06] text-rose-300 hover:bg-white/[0.12]'
                      : 'border-black/20 bg-black/[0.04] text-rose-600 hover:bg-black/[0.10]'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isLiking ? 'animate-pulse' : ''}`} fill="currentColor" />
                </button>
                <span
                  className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 ${
                    isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  }`}
                >
                  Add a like!
                </span>
              </div>

              <div>
                <p className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{likeCount}</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>total likes</p>
              </div>
            </div>
          </article>

          <article
            className={`rounded-2xl border p-3 sm:p-4 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:min-h-[150px] transition-transform duration-300 hover:scale-[1.01] ${
              isDarkMode ? 'border-white/10 bg-black/30' : 'border-black/10 bg-white/70'
            }`}
          >
            <div className="flex items-center gap-2">
              <CloudSun className={`h-5 w-5 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Gainesville Weather</h3>
            </div>
            {isLoadingWeather && <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading weather...</p>}
            {!isLoadingWeather && weather && (
              <div className="mt-4">
                <p className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(weather.temperatureF)}°F
                  <span className={`ml-2 text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    ({Math.round(weather.temperatureC)}°C)
                  </span>
                </p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{weather.weatherLabel}</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wind: {Math.round(weather.windMph)} mph</p>
              </div>
            )}
            {!isLoadingWeather && !weather && (
              <p className={`mt-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Weather data unavailable right now.
              </p>
            )}
          </article>

        </div>
      </motion.div>
    </div>
  );
}

export default ActivityHubSection;
