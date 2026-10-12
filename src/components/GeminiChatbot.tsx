import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Bot,
  Send,
  X,
  RotateCcw,
  MapPin,
  Globe,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Navigation,
  MessageSquareText,
  Zap,
  BrainCircuit,
  Info,
  Mic,
  Square,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { HenIcon } from './HenIcon';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  toolUsed?: 'maps' | 'search' | 'none';
  grounding?: {
    webSources?: Array<{ title: string; uri: string }>;
    mapPlaces?: Array<{ title: string; uri: string; address?: string }>;
    searchQueries?: string[];
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: "Namaste & Welcome to **Kanchan Patil Group**! 🌿\n\nI am **K - GPT**, your official AI Concierge powered by **Google Gemini**. I have real-time access to **Google Maps data** for our campus navigation and **Google Search data** for authentic agricultural insights.\n\nHow may I assist you today? Feel free to ask about our **Pure Gavran Eggs**, free-range poultry farming, nursery plant availability, or exact directions to Kanchan Patil Farm's.",
    timestamp: 'Just now',
  }
];

const SUGGESTED_QUESTIONS = [
  { label: "📍 Directions to Kanchan Patil Farm's", query: "How do I reach Kanchan Patil Farm's in Uruli Kanchan, Pune? Please give me exact location, road directions, and visiting hours." },
  { label: "🥚 Pure Gavran Eggs nutrition & benefits", query: "What makes Kanchan Patil Group's Pure Gavran Eggs high in protein, and what are their nutritional benefits compared to broiler eggs?" },
  { label: "🐔 Free-Range Native Poultry breeding", query: "How are native Gavran country birds reared at Gavran Poultry Farms, and what bio-secure feed practices are followed?" },
  { label: "🌱 6-inch Tecoma & flowering plants", query: "Tell me about the 6-inch Tecoma varieties and flowering ornamental shrubs cultivated at K Group of Nursery." },
  { label: "🌿 Wholesale Netpot live plant varieties", query: "What live plant species and netpot saplings does K Group of Nursery supply for wholesale buyers and commercial greening?" },
  { label: "🌳 Estate & farmhouse landscaping", query: "What commercial landscaping, shade trees, and avenue plantation services does K Group of Nursery offer for private farmhouses?" },
  { label: "⏰ Visiting hours for campus", query: "What are the daily operating hours for visiting Gavran Poultry Farms and K Group of Nursery at Kanchan Patil Farm's?" },
  { label: "📈 Today's Gavran egg market rates", query: "What are the current market prices and wholesale rates of organic Gavran country eggs in Pune?" },
  { label: "📦 Wholesale orders & farm pickup", query: "How can I place a wholesale order for fresh Gavran eggs or nursery plants, and is direct farm pickup available?" },
  { label: "👤 Founder Anuj Kanchan & AI vision", query: "Who is Anuj Ganesh Kanchan, and how does his background in AI engineering guide Kanchan Patil Group's agricultural innovations?" }
];

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.5-flash');
  const [groundingMode, setGroundingMode] = useState<'auto' | 'maps' | 'search' | 'none'>('auto');
  const [showSettings, setShowSettings] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audio Transcription State (gemini-3.5-transcribe)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);

  // Web Speech API Voice Input State
  const [isVoiceInputActive, setIsVoiceInputActive] = useState(false);
  const [voiceInputError, setVoiceInputError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const hasSpokenRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-gemini-chat', handleOpen);
    return () => window.removeEventListener('open-gemini-chat', handleOpen);
  }, []);

  // Cleanup microphone recording and Web Speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const startRecording = async () => {
    setTranscriptionError(null);
    setVoiceInputError(null);
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setTranscriptionError('Microphone audio recording is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      // Select supported audio MIME type
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        mimeType = 'audio/webm';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        mimeType = 'audio/ogg';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((t) => t.stop());
          mediaStreamRef.current = null;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size < 200) {
          setTranscriptionError('Audio sample too short. Please hold or speak closer to your microphone.');
          return;
        }

        // Convert blob to base64 and send to /api/transcribe
        setIsTranscribing(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64Data = (reader.result as string).split(',')[1];
            const res = await fetch('/api/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audio: base64Data,
                mimeType,
              }),
            });

            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              throw new Error(errData.error || `Transcription error (status ${res.status})`);
            }

            const data = await res.json();
            const transcribedText = data.transcription?.trim();
            if (transcribedText) {
              setInput((prev) => (prev.trim() ? `${prev.trim()} ${transcribedText}` : transcribedText));
              setTranscriptionError(null);
              setTimeout(() => inputRef.current?.focus(), 200);
            } else {
              setTranscriptionError('No speech detected in audio. Please speak closer to your microphone, or choose a suggested question below.');
            }
          } catch (err: any) {
            console.warn('Audio transcription warning:', err);
            setTranscriptionError(err?.message || 'Failed to transcribe audio. Please speak clearly or tap a suggestion below.');
          } finally {
            setIsTranscribing(false);
          }
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      // Start recording timer with max duration limit (60s)
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone permission check:', err);
      setTranscriptionError(
        err?.name === 'NotAllowedError'
          ? 'Microphone permission denied. Please allow microphone access in your browser.'
          : 'Could not access microphone input.'
      );
    }
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.requestData();
      } catch {
        // ignore
      }
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const cancelRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    audioChunksRef.current = [];
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  // Web Speech API: Start Voice Input
  const startVoiceInput = () => {
    setVoiceInputError(null);
    setTranscriptionError(null);

    // Cancel audio recording if currently active
    if (isRecording) {
      cancelRecording();
    }

    const SpeechRecognitionClass =
      typeof window !== 'undefined'
        ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
        : null;

    if (!SpeechRecognitionClass) {
      // If Web Speech API is not supported in this browser, seamlessly use Gemini Audio Recording
      startRecording();
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US';
      recognition.maxAlternatives = 1;

      hasSpokenRef.current = false;
      const startingText = input.trim();

      recognition.onstart = () => {
        setIsVoiceInputActive(true);
        setVoiceInputError(null);
      };

      recognition.onresult = (event: any) => {
        let currentFinal = '';
        let currentInterim = '';

        for (let i = 0; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            currentFinal += item[0]?.transcript || '';
          } else {
            currentInterim += item[0]?.transcript || '';
          }
        }

        const recognizedText = (currentFinal + currentInterim).trim();
        if (recognizedText) {
          hasSpokenRef.current = true;
          const combined = startingText ? `${startingText} ${recognizedText}` : recognizedText;
          setInput(combined);
          setVoiceInputError(null);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition warning:', event.error);
        if (event.error === 'not-allowed') {
          setVoiceInputError('Microphone access denied: Permission denied. Please allow microphone permissions in your browser to speak directly into the search box.');
        } else if (event.error === 'no-speech') {
          if (!hasSpokenRef.current) {
            setVoiceInputError('No speech detected in audio. Please speak closer to your microphone, or choose a quick question below.');
          }
        } else if (event.error === 'audio-capture') {
          setVoiceInputError('No microphone detected. Please check your audio hardware.');
        } else if (event.error === 'network') {
          console.warn('Web Speech API network error, switching to Gemini recording mode');
          setIsVoiceInputActive(false);
          startRecording();
          return;
        } else if (event.error !== 'aborted') {
          setVoiceInputError(`Voice input notice: ${event.error}`);
        }
        setIsVoiceInputActive(false);
      };

      recognition.onend = () => {
        setIsVoiceInputActive(false);
        recognitionRef.current = null;
        setTimeout(() => inputRef.current?.focus(), 150);
      };

      recognition.start();
      setIsVoiceInputActive(true);
    } catch (err: any) {
      console.warn('Web Speech API invocation warning:', err);
      // Fallback directly to server-side Gemini recording
      startRecording();
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsVoiceInputActive(false);
  };

  const toggleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    if (isVoiceInputActive) {
      stopVoiceInput();
      return;
    }

    const SpeechRecognitionClass =
      typeof window !== 'undefined'
        ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
        : null;

    if (SpeechRecognitionClass) {
      startVoiceInput();
    } else {
      startRecording();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (isVoiceInputActive) {
      stopVoiceInput();
    }
    setVoiceInputError(null);
    setTranscriptionError(null);
    setMessages(INITIAL_MESSAGES);
  };

  const handleSendMessage = async (textToSend?: string) => {
    if (isVoiceInputActive) {
      stopVoiceInput();
    }
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      // Determine user location if available
      let userLocation: { latitude: number; longitude: number } | undefined;
      try {
        if ('geolocation' in navigator) {
          const pos = await new Promise<GeolocationPosition | null>((resolve) => {
            navigator.geolocation.getCurrentPosition(resolve, () => resolve(null), { timeout: 3000 });
          });
          if (pos) {
            userLocation = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            };
          }
        }
      } catch {
        // fallback to Kanchan Patil coordinates
      }

      // Convert messages to server format
      const serverMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: serverMessages,
          model: selectedModel,
          groundingMode,
          userLocation,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
        toolUsed: data.toolUsed,
        grounding: data.grounding,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const isQuota = typeof err?.message === 'string' && (err.message.includes('429') || err.message.includes('quota') || err.message.includes('RESOURCE_EXHAUSTED'));
      const fallbackContent = isQuota
        ? "Welcome to Kanchan Patil Group! Our virtual desk is available to assist you with fresh Gavran eggs, nursery plants, or estate directions. You can also connect with our team directly on WhatsApp at **+91 7517004343**."
        : `I encountered an issue connecting to Gemini: "${err?.message || 'Network error'}". You can reach our team directly via WhatsApp at +91 7517004343.`;

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: fallbackContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse inline tokens: bold, markdown links, raw URLs, code
  const renderInlineContent = (rawText: string) => {
    // Regex splits on [text](url), **bold**, `code`, or raw http(s) URLs
    const tokenRegex = /(\[.*?\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*|`.*?`|https?:\/\/[^\s<)\]]+)/g;
    const parts = rawText.split(tokenRegex);

    return parts.map((part, idx) => {
      if (!part) return null;

      // 1. Markdown link: [text](url)
      const mdLinkMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
      if (mdLinkMatch) {
        const [, text, url] = mdLinkMatch;
        const isMaps = url.includes('google.com/maps') || url.includes('goo.gl/maps');
        return (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFD700] hover:text-white bg-black/70 hover:bg-[#FFD700]/20 border border-[#D4AF37]/50 px-2.5 py-1 rounded-lg my-1 transition-all max-w-full break-all"
          >
            {isMaps ? <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0" /> : <ExternalLink className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />}
            <span className="truncate max-w-[200px] sm:max-w-[250px]">{text}</span>
            <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-0.5" />
          </a>
        );
      }

      // 2. Bold text: **text**
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={idx} className="text-[#FFD700] font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // 3. Inline code: `code`
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={idx} className="bg-black/60 text-[#FFD700] px-1.5 py-0.5 rounded text-[11px] font-mono border border-white/10">
            {part.slice(1, -1)}
          </code>
        );
      }

      // 4. Raw URL: https://...
      if (/^https?:\/\//i.test(part)) {
        const isMaps = part.includes('google.com/maps') || part.includes('goo.gl/maps');
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFD700] hover:text-white bg-black/80 hover:bg-[#FFD700]/20 border border-[#D4AF37]/60 px-2.5 py-1 rounded-lg my-1 transition-all max-w-full break-all shadow-sm"
          >
            {isMaps ? <MapPin className="w-3.5 h-3.5 text-[#FFD700] shrink-0" /> : <ExternalLink className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />}
            <span className="truncate max-w-[190px] sm:max-w-[250px]">
              {isMaps ? "Open in Google Maps" : part.replace(/^https?:\/\/(www\.)?/, '').slice(0, 32)}
            </span>
            <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-0.5" />
          </a>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  // Structured Markdown text formatter for responses: eliminates raw hashtags & overflows
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();

      // Empty line -> spacing
      if (!trimmed) {
        return <div key={i} className="h-1.5" />;
      }

      // Strip Markdown Headings:
      // ### Heading 3 -> styled subheading without hashtags!
      if (/^###\s+/.test(trimmed)) {
        const headingText = trimmed.replace(/^###\s+/, '');
        return (
          <div key={i} className="text-xs sm:text-sm font-bold text-[#FFD700] mt-2.5 mb-1 flex items-center gap-1.5 border-b border-[#D4AF37]/20 pb-0.5">
            <Sparkles className="w-3 h-3 text-[#FFD700] shrink-0" />
            <span className="break-words">{renderInlineContent(headingText)}</span>
          </div>
        );
      }

      // ## Heading 2 -> styled section heading without hashtags!
      if (/^##\s+/.test(trimmed)) {
        const headingText = trimmed.replace(/^##\s+/, '');
        return (
          <div key={i} className="text-xs sm:text-sm font-extrabold text-white gold-text-gradient mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="break-words">{renderInlineContent(headingText)}</span>
          </div>
        );
      }

      // # Heading 1 -> primary heading without hashtags!
      if (/^#\s+/.test(trimmed)) {
        const headingText = trimmed.replace(/^#\s+/, '');
        return (
          <div key={i} className="text-sm font-black text-white mt-3.5 mb-1.5">
            <span className="break-words">{renderInlineContent(headingText)}</span>
          </div>
        );
      }

      // Numbered list item: 1. Item
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return (
          <div key={i} className="flex items-start gap-2 my-1 text-gray-200">
            <span className="w-4 h-4 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFD700] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {numMatch[1]}
            </span>
            <div className="flex-1 min-w-0 break-words">{renderInlineContent(numMatch[2])}</div>
          </div>
        );
      }

      // Bullet list item: - Item or * Item or • Item
      if (/^[-*•]\s+/.test(trimmed)) {
        const itemText = trimmed.replace(/^[-*•]\s+/, '');
        return (
          <div key={i} className="flex items-start gap-2 my-1 text-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] shrink-0 mt-1.5" />
            <div className="flex-1 min-w-0 break-words">{renderInlineContent(itemText)}</div>
          </div>
        );
      }

      // Standard paragraph
      return (
        <div key={i} className="leading-relaxed my-1 text-gray-200 break-words overflow-hidden">
          {renderInlineContent(line)}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Gemini Chatbot"
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#080808] via-[#1c1912] to-[#D4AF37] p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center cursor-pointer group focus:outline-none"
        >
          <div className="w-full h-full bg-[#121212] group-hover:bg-[#181818] rounded-[14px] flex items-center justify-center transition-colors">
            {isOpen ? (
              <X className="w-6 h-6 text-[#FFD700]" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#FFD700] animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black" />
              </div>
            )}
          </div>
        </motion.button>
      </div>

      {/* Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[580px] max-h-[80vh] z-50 flex flex-col rounded-3xl glass-card border border-[#D4AF37]/40 bg-[#0d0d0d]/98 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 border-b border-[#D4AF37]/20 bg-[#161616] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] flex items-center justify-center text-black font-bold shadow-md">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1">
                      K - GPT <span className="gold-text-gradient text-xs">AI Concierge</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Gemini Online
                    </span>
                    <span>•</span>
                    <span className="text-[#FFD700]">{selectedModel.replace('-preview', '')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Controls */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="Configure Model & Grounding"
                  className={`p-1.5 rounded-lg border transition-colors ${
                    showSettings
                      ? 'bg-[#FFD700] text-black border-[#FFD700]'
                      : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetChat}
                  title="Restart conversation"
                  className="p-1.5 rounded-lg bg-black/40 text-gray-400 border border-white/10 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (isVoiceInputActive) stopVoiceInput();
                    setIsOpen(false);
                  }}
                  title="Close chat"
                  className="p-1.5 rounded-lg bg-black/40 text-gray-400 border border-white/10 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Config & Grounding Settings Panel (Collapsible) */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-3 bg-[#111111] border-b border-[#D4AF37]/20 text-xs overflow-hidden"
                >
                  <div className="mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Gemini Model
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => setSelectedModel('gemini-3.5-flash')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                          selectedModel === 'gemini-3.5-flash'
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        3.5 Flash (Default)
                      </button>
                      <button
                        onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                          selectedModel === 'gemini-3.1-flash-lite'
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        3.1 Flash-Lite (Fast)
                      </button>
                      <button
                        onClick={() => setSelectedModel('gemini-3.1-pro-preview')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                          selectedModel === 'gemini-3.1-pro-preview'
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        3.1 Pro (Deep)
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                      Grounding Tool
                    </span>
                    <div className="grid grid-cols-4 gap-1">
                      <button
                        onClick={() => setGroundingMode('auto')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                          groundingMode === 'auto'
                            ? 'bg-[#FFD700] text-black border-[#FFD700] font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        ⚡ Smart Auto
                      </button>
                      <button
                        onClick={() => setGroundingMode('maps')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center flex items-center justify-center gap-1 transition-all ${
                          groundingMode === 'maps'
                            ? 'bg-amber-400 text-black border-amber-400 font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        <MapPin className="w-3 h-3" /> Maps
                      </button>
                      <button
                        onClick={() => setGroundingMode('search')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center flex items-center justify-center gap-1 transition-all ${
                          groundingMode === 'search'
                            ? 'bg-blue-400 text-black border-blue-400 font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        <Globe className="w-3 h-3" /> Search
                      </button>
                      <button
                        onClick={() => setGroundingMode('none')}
                        className={`p-1.5 rounded-lg text-[11px] font-medium border text-center transition-all ${
                          groundingMode === 'none'
                            ? 'bg-gray-200 text-black border-gray-200 font-bold'
                            : 'bg-black text-gray-300 border-white/10'
                        }`}
                      >
                        Direct
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Conversation Thread */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 space-y-3.5 scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[85%] p-3.5 rounded-2xl text-xs break-words overflow-hidden ${
                        isUser
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-black rounded-tr-sm font-medium shadow-md ml-auto'
                          : 'bg-[#181818] border border-[#D4AF37]/25 text-gray-200 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.5)] mr-auto'
                      }`}
                    >
                      {/* Assistant Header Tag */}
                      {!isUser && (
                        <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-white/10 pb-1">
                          <span className="text-[10px] font-bold text-[#FFD700] flex items-center gap-1">
                            <Bot className="w-3 h-3" /> K - GPT
                          </span>
                          <div className="flex items-center gap-1.5">
                            {msg.toolUsed === 'maps' && (
                              <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40 flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5" /> Maps Grounded
                              </span>
                            )}
                            {msg.toolUsed === 'search' && (
                              <span className="text-[9px] font-bold text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-500/40 flex items-center gap-0.5">
                                <Globe className="w-2.5 h-2.5" /> Search Grounded
                              </span>
                            )}
                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="text-gray-400 hover:text-white p-0.5"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="w-full break-words overflow-hidden space-y-1">
                        {isUser ? <p className="break-words leading-relaxed">{msg.content}</p> : renderFormattedText(msg.content)}
                      </div>

                      {/* Grounding Places & Sources (Maps & Search) */}
                      {!isUser && msg.grounding && (
                        <div className="mt-2.5 pt-2 border-t border-white/10 space-y-2 max-w-full overflow-hidden">
                          {/* Map Places */}
                          {msg.grounding.mapPlaces && msg.grounding.mapPlaces.length > 0 && (
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                                <MapPin className="w-3 h-3" /> Google Maps Places:
                              </span>
                              <div className="flex flex-wrap gap-1.5 max-w-full overflow-hidden pt-0.5">
                                {msg.grounding.mapPlaces.map((place, pIdx) => (
                                  <a
                                    key={pIdx}
                                    href={place.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-amber-950/70 hover:bg-amber-900/90 text-[#FFD700] border border-amber-500/50 px-2.5 py-1 rounded-lg transition-colors max-w-full truncate shadow-sm"
                                  >
                                    <MapPin className="w-3 h-3 text-[#FFD700] shrink-0" />
                                    <span className="truncate max-w-[200px] sm:max-w-[250px]">{place.title}</span>
                                    <ExternalLink className="w-2.5 h-2.5 text-amber-300 shrink-0 ml-0.5" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Search Sources */}
                          {msg.grounding.webSources && msg.grounding.webSources.length > 0 && (
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1 mb-1">
                                <Globe className="w-3 h-3" /> Verified Web Sources:
                              </span>
                              <div className="flex flex-wrap gap-1.5 max-w-full overflow-hidden pt-0.5">
                                {msg.grounding.webSources.slice(0, 4).map((src, sIdx) => (
                                  <a
                                    key={sIdx}
                                    href={src.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 border border-blue-500/40 px-2.5 py-1 rounded-lg transition-colors truncate max-w-full"
                                  >
                                    <Globe className="w-3 h-3 text-blue-400 shrink-0" />
                                    <span className="truncate max-w-[190px] sm:max-w-[240px]">{src.title}</span>
                                    <ExternalLink className="w-2.5 h-2.5 text-blue-300 shrink-0 ml-0.5" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-[9px] text-right mt-1 opacity-70">
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-gray-400 p-2 rounded-xl bg-[#181818] w-fit border border-[#D4AF37]/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700] animate-spin" />
                  <span>Thinking with Gemini...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="px-3 py-1.5 bg-[#121212] border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {SUGGESTED_QUESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s.query)}
                  disabled={loading}
                  className="shrink-0 text-[10px] bg-black/60 hover:bg-[#FFD700]/10 text-gray-300 hover:text-[#FFD700] border border-white/10 hover:border-[#D4AF37]/40 px-2.5 py-1 rounded-full transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Message Input Box & Audio Transcription */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#161616] border-t border-[#D4AF37]/20 flex flex-col gap-2"
            >
              {/* Active Audio Recording Status Banner */}
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs shadow-inner"
                  >
                    <div className="flex items-center gap-2 text-red-200">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span className="font-semibold text-white text-[11px]">
                        Recording: 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
                      </span>
                      <span className="text-[10px] text-red-300 hidden sm:inline">
                        (gemini-3.5-transcribe)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="px-2.5 py-0.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] transition-colors cursor-pointer"
                      >
                        Done & Transcribe
                      </button>
                      <button
                        type="button"
                        onClick={cancelRecording}
                        className="px-2 py-0.5 rounded-lg bg-black/50 hover:bg-black text-gray-400 hover:text-white text-[10px] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Transcribing Status Banner */}
                {isTranscribing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-200 text-xs"
                  >
                    <Loader2 className="w-3.5 h-3.5 text-[#FFD700] animate-spin shrink-0" />
                    <span className="text-[11px] font-medium text-[#FFD700]">
                      Transcribing voice with <strong className="font-semibold">gemini-3.5-transcribe</strong>...
                    </span>
                  </motion.div>
                )}

                {/* Web Speech API Live Listening Banner */}
                {isVoiceInputActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs shadow-inner"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                      <span className="text-[11px] font-medium text-red-200">
                        Listening live... Speak clearly into your microphone!
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={stopVoiceInput}
                      className="px-2 py-0.5 rounded-lg bg-red-900/80 hover:bg-red-800 text-white text-[10px] font-semibold transition-colors cursor-pointer"
                    >
                      Done / Stop
                    </button>
                  </motion.div>
                )}

                {/* Voice Input or Transcription Error / Guidance Banner */}
                {(voiceInputError || transcriptionError) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="text-[11px] font-medium text-red-300">
                          {voiceInputError || transcriptionError}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setVoiceInputError(null);
                          setTranscriptionError(null);
                        }}
                        className="text-gray-400 hover:text-white text-[10px] underline shrink-0 cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>

                    {/* Quick action buttons & retry */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5 border-t border-red-500/20">
                      <button
                        type="button"
                        onClick={() => {
                          setVoiceInputError(null);
                          setTranscriptionError(null);
                          startVoiceInput();
                        }}
                        className="px-2 py-0.5 rounded-md bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FFD700] text-[10px] font-semibold border border-[#D4AF37]/40 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Mic className="w-2.5 h-2.5" />
                        <span>Speak Again</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVoiceInputError(null);
                          setTranscriptionError(null);
                          startRecording();
                        }}
                        className="px-2 py-0.5 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-200 text-[10px] font-semibold border border-red-500/30 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <span>Record Audio</span>
                      </button>

                      <span className="text-[10px] text-gray-400">or ask:</span>

                      <button
                        type="button"
                        onClick={() => {
                          setVoiceInputError(null);
                          setTranscriptionError(null);
                          handleSendMessage("Where is Kanchan Patil farm located?");
                        }}
                        className="px-1.5 py-0.5 rounded bg-black/40 hover:bg-black text-[10px] text-gray-300 hover:text-[#FFD700] border border-white/10 transition-colors cursor-pointer"
                      >
                        📍 Farm directions
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVoiceInputError(null);
                          setTranscriptionError(null);
                          handleSendMessage("Tell me about pure Gavran eggs nutrition & price");
                        }}
                        className="px-1.5 py-0.5 rounded bg-black/40 hover:bg-black text-[10px] text-gray-300 hover:text-[#FFD700] border border-white/10 transition-colors cursor-pointer"
                      >
                        🥚 Gavran eggs
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Voice Input Action Button Bar near Search Box */}
              <div className="flex items-center justify-between px-0.5 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={toggleVoiceInput}
                    disabled={loading || isTranscribing}
                    title={isVoiceInputActive ? "Stop Voice Input" : "Start Voice Input"}
                    aria-label={isVoiceInputActive ? "Stop Voice Input" : "Start Voice Input"}
                    data-testid="start-voice-input-btn"
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border shadow-sm cursor-pointer ${
                      isVoiceInputActive
                        ? "bg-red-500/25 border-red-500 text-red-300 animate-pulse"
                        : "bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#FFD700] border-[#D4AF37]/40 hover:border-[#FFD700]"
                    }`}
                  >
                    <Mic className={`w-3.5 h-3.5 ${isVoiceInputActive ? "text-red-400 animate-bounce" : "text-[#FFD700]"}`} />
                    <span>{isVoiceInputActive ? "Stop Voice Input" : "Start Voice Input"}</span>
                    <span className="text-[10px] text-gray-400 font-normal hidden sm:inline">(Live Speech)</span>
                  </button>

                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={loading || isTranscribing || isVoiceInputActive}
                    title={isRecording ? "Finish Recording" : "Record Voice via Gemini AI"}
                    aria-label={isRecording ? "Finish Recording" : "Record Voice via Gemini AI"}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border cursor-pointer ${
                      isRecording
                        ? "bg-red-600/30 border-red-500 text-white animate-pulse"
                        : "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-ping" : "bg-red-400"}`} />
                    <span>{isRecording ? "Done" : "AI Record"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 hidden xs:inline">
                    {isVoiceInputActive
                      ? "Listening live..."
                      : isRecording
                      ? `Recording ${recordingSeconds}s...`
                      : "Speak directly into box"}
                  </span>
                </div>
              </div>

              {/* Input Row with Search Box, Voice Input Button, and Send */}
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isVoiceInputActive
                      ? "Listening via Web Speech API... Speak your query directly"
                      : isRecording
                      ? "Listening to speech... Speak clearly"
                      : isTranscribing
                      ? "Transcribing with gemini-3.5-transcribe..."
                      : "Ask about Gavran eggs, nursery plants, directions..."
                  }
                  disabled={loading || isTranscribing}
                  className="flex-1 bg-[#0a0a0a] text-white placeholder-gray-500 text-xs px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 focus:outline-none focus:border-[#FFD700] transition-colors disabled:opacity-60"
                />

                {/* Voice Input Button near search box (Web Speech API) */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  disabled={loading || isTranscribing}
                  title={isVoiceInputActive ? "Stop Voice Input" : "Start Voice Input"}
                  aria-label={isVoiceInputActive ? "Stop Voice Input" : "Start Voice Input"}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    isVoiceInputActive
                      ? "bg-red-600 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer"
                      : isRecording
                      ? "bg-red-600 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer"
                      : isTranscribing
                      ? "bg-amber-950/60 border border-[#FFD700]/50 text-[#FFD700] cursor-wait"
                      : "bg-[#181818] hover:bg-[#D4AF37]/20 text-[#D4AF37] hover:text-[#FFD700] border border-[#D4AF37]/30 hover:border-[#FFD700] cursor-pointer"
                  }`}
                >
                  {isTranscribing ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#FFD700]" />
                  ) : isVoiceInputActive ? (
                    <Square className="w-4 h-4 fill-white text-white" />
                  ) : isRecording ? (
                    <Square className="w-4 h-4 fill-white text-white" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || loading || isTranscribing}
                  aria-label="Send message"
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                    input.trim() && !loading && !isTranscribing
                      ? "bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-black cursor-pointer shadow-md"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
