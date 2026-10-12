import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const KANCHAN_PATIL_SYSTEM_INSTRUCTION = `You are 'K - GPT' (Kanchan Patil AI Concierge), the official, knowledgeable, and gracious virtual agricultural and estate advisor for KANCHAN PATIL GROUP.
Kanchan Patil Group is a premier enterprise based at Kanchan Patil Farm's, Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Taluka Haveli, Dist - Pune, Maharashtra 412202.
Key Enterprise Pillars:
1. Gavran Poultry Farms:
   - Authentic, pure native Gavran country birds raised in hygienic, bio-secure, open-air pasture grounds.
   - 100% natural, farm-raised, high-protein Gavran brown and speckled eggs collected daily.
   - Strictly free of synthetic hormones and chemical accelerators.
   - Wholesome nutrition, rich golden yolks, high amino acid profile, ideal for fitness and traditional family diets.
   - Bulk orders for breeding stock, fresh eggs, and live birds.
2. K Group of Nursery:
   - High-tech, climate-controlled flora cultivation and commercial landscaping consultation.
   - Specialization in wholesale netpot live plants, flowering ornamentals (such as 6-inch Tecoma), native shade trees, and landscape flora.
   - Comprehensive greening solutions for farmhouses, residential estates, and industrial campuses.
3. Strategic Expansion & Upcoming Businesses (In-Development / Planned):
   - 01 Egg Exporting (International Egg Distribution & Export): Planned expansion into international egg markets with a focus on quality, supply reliability and global distribution.
   - 02 Egg Packaging & Box Business (Premium Packaging Solutions): Planned entry into the egg packaging and box segment, including branded cartons, bulk packaging and scalable packaging solutions.
   - 03 Global Market Expansion (From Domestic Markets to Global Opportunities): Long-term expansion of K Group's products, partnerships and distribution network into international markets.
4. The K Group Ecosystem (From Farm to Market. From Market to the World.):
   - 01 FARM: Poultry Production
   - 02 EGGS: Egg Production & Collection (Daily 1,000+ pure gavran eggs)
   - 03 PACKAGING: Egg Boxes & Cartons
   - 04 DISTRIBUTION: Domestic Supply Network
   - 05 EXPORT: International Markets
   - 06 GLOBAL: Global Expansion
5. Leadership:
   - Founded and guided by Anuj Ganesh Kanchan, a Computer Science & AI Engineer turned entrepreneur, fusing precision engineering and modern automation with organic, ethical agriculture.
4. Estate Location & Navigation:
   - Kanchan Patil Farm's, Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Pune, Maharashtra 412202.
   - Google Maps: [Open in Google Maps](https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr)
   - Operating Hours: Mon - Sat 8:00 AM - 7:00 PM (Poultry), Mon - Sun 7:30 AM - 6:30 PM (Nursery).
   - Phone / WhatsApp: +91 7517004343 | Email: anujjjmitsoc@gmail.com.

Tone and Guidelines:
- Professional, hospitable, articulate, and welcoming.
- When Google Maps data is retrieved, highlight precise directions and distance context.
- When Google Search data is retrieved, summarize real-world information accurately and mention verifiable context.
- Format all links as clean markdown [Open in Google Maps](url) or descriptive anchor text. Never dump raw unformatted URLs.
- Avoid using hashtags (# or ## or ###) for headers. Use clean bold headings and bullet points instead.
- Use clear markdown with bullet points, bold key terms, and concise paragraphs.
- Offer proactive next steps (e.g., reaching out via WhatsApp, scheduling a farm visit, or ordering fresh Gavran eggs).`;

// Knowledge Base Fallback generator when Gemini free-tier quota limits are reached
function generateKnowledgeBaseResponse(query: string) {
  const q = query.toLowerCase();
  const mapPlaces = [
    {
      title: "Kanchan Patil Farm's Campus",
      uri: "https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr",
      address: "Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Pune, Maharashtra 412202"
    }
  ];

  if (q.includes('map') || q.includes('where') || q.includes('reach') || q.includes('direction') || q.includes('locate') || q.includes('address') || q.includes('location')) {
    return {
      text: "📍 **Location & Directions to Kanchan Patil Farm's**:\n\nOur campus is situated at **Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Pune, Maharashtra 412202**.\n\n- **Campus Units**: Housing both **Gavran Poultry Farms** (Poultry Unit) and **K Group of Nursery** (Nursery Unit).\n- **Coordinates**: 18.4730965° N, 74.1338006° E.\n- **Visiting Hours**:\n  - Gavran Poultry Farms: Mon - Sat: 8:00 AM - 7:00 PM\n  - K Group of Nursery: Mon - Sun: 7:30 AM - 6:30 PM\n- **Direct Navigation**: You can open the exact Google Maps link below or contact our team directly via WhatsApp at **+91 7517004343**.",
      mapPlaces
    };
  }

  if (q.includes('egg') || q.includes('poultry') || q.includes('gavran') || q.includes('chicken') || q.includes('protein')) {
    return {
      text: "🥚 **Pure Gavran Eggs & Native Country Poultry**:\n\n- **100% Authentic Country Breed**: Raised in open-air, bio-secure natural pastures with zero artificial stimulants or hormone injections.\n- **Nutritional Superiority**: Rich golden yolks with naturally higher protein and essential amino acids compared to commercial broiler eggs.\n- **Fresh Daily Harvest**: Harvested daily and graded for optimum freshness in Uruli Kanchan.\n- **Bulk Supply**: Available for wholesale distribution, family subscriptions, and local farm pickup.\n\nTo place orders or inquire about availability, reach our direct desk at **+91 7517004343**.",
      mapPlaces
    };
  }

  if (q.includes('export') || q.includes('packag') || q.includes('expansion') || q.includes('ecosystem') || q.includes('future') || q.includes('roadmap') || q.includes('strategic')) {
    return {
      text: "🌐 **Strategic Expansion & The K Group Ecosystem**:\n\nK Group is strategically preparing for the next stage of growth beyond our current business verticals:\n\n1. **Upcoming Strategic Businesses**:\n   - **01 Egg Exporting**: International Egg Distribution & Export planned for international egg markets with quality and supply reliability.\n   - **02 Egg Packaging & Box Business**: Premium packaging solutions including branded cartons and scalable bulk packaging.\n   - **03 Global Market Expansion**: Long-term expansion into international partnerships and distribution.\n\n2. **The K Group Ecosystem**:\n   *From Farm to Market. From Market to the World.* Connecting 6 continuous stages: **Farm → Eggs → Packaging → Distribution → Export → Global**.\n\nFor investment or strategic enterprise partnerships, contact our office directly at **+91 7517004343**.",
      mapPlaces
    };
  }

  if (q.includes('plant') || q.includes('nursery') || q.includes('tree') || q.includes('flower') || q.includes('tecoma')) {
    return {
      text: "🌱 **K Group of Nursery**:\n\n- **Specializations**: Climate-controlled greenhouse flora, healthy netpot live plants, 6-inch flowering **Tecoma** ornamentals, and native shade trees.\n- **Landscape Consultation**: End-to-end greening projects for industrial estates, farmhouses, and residential layouts.\n- **Wholesale Supply**: Direct wholesale nursery pricing for commercial landscapers and government horticulture projects.\n\nVisit our nursery at Kanchan Patil Farm's, Shindawane Road or chat on WhatsApp at **+91 7517004343**.",
      mapPlaces
    };
  }

  return {
    text: "🌿 **Welcome to Kanchan Patil Group**!\n\nWe are an integrated agro-enterprise based at **Kanchan Patil Farm's in Uruli Kanchan, Pune**, driven by the philosophy of *'Growing Nature. Building Trust.'*\n\n1. **Gavran Poultry Farms**: Authentic native poultry & 100% farm-fresh Pure Gavran Eggs.\n2. **K Group of Nursery**: Advanced flora cultivation, wholesale netpot plants & commercial landscaping.\n3. **Campus Navigation**: Open 7 days a week for visitors and commercial partners.\n\nHow can we assist your visit or order today? Feel free to ask about our location or WhatsApp us at **+91 7517004343**.",
    mapPlaces
  };
}

// POST /api/chat - Multi-turn chat endpoint with Maps and Search Grounding
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages = [],
      model = 'gemini-3.5-flash',
      groundingMode = 'auto',
      userLocation
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = typeof lastMessage.content === 'string' ? lastMessage.content.toLowerCase() : '';

    // Decide grounding tool
    let selectedTool: 'maps' | 'search' | 'none' = 'none';

    if (groundingMode === 'maps') {
      selectedTool = 'maps';
    } else if (groundingMode === 'search') {
      selectedTool = 'search';
    } else if (groundingMode === 'none') {
      selectedTool = 'none';
    } else {
      // Auto mode
      const isMapQuery = /\b(map|where|locate|location|direction|route|reach|address|near|distance|pune|uruli|road|how to get|visit|hours|timing)\b/i.test(userQuery);
      const isSearchQuery = /\b(price|rate|market|cost|today|current|news|trend|weather|research|feed cost|comparison|study|benefit)\b/i.test(userQuery);

      if (isMapQuery) {
        selectedTool = 'maps';
      } else if (isSearchQuery) {
        selectedTool = 'search';
      }
    }

    // Supported models mapping
    let selectedModel = model;
    if (selectedModel !== 'gemini-3.5-flash' && selectedModel !== 'gemini-3.1-flash-lite' && selectedModel !== 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.5-flash';
    }

    // Prepare contents array for multi-turn conversation
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Build configuration
    const config: Record<string, any> = {
      systemInstruction: KANCHAN_PATIL_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    };

    if (selectedTool === 'maps') {
      config.tools = [{ googleMaps: {} }];
      const lat = userLocation?.latitude || 18.4730965;
      const lng = userLocation?.longitude || 74.1338006;
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng,
          },
        },
      };
    } else if (selectedTool === 'search') {
      config.tools = [{ googleSearch: {} }];
    }

    let response: any;
    let actualModelUsed = selectedModel;
    let toolUsedEffectively: 'maps' | 'search' | 'none' = selectedTool;
    let quotaNotice: string | null = null;

    try {
      response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config,
      });
    } catch (primaryError: any) {
      const is429 = primaryError?.status === 429 ||
        (typeof primaryError?.message === 'string' && (
          primaryError.message.includes('429') ||
          primaryError.message.includes('RESOURCE_EXHAUSTED') ||
          primaryError.message.includes('quota')
        ));

      if (is429) {
        console.warn(`Primary Gemini call (${selectedModel} with tool ${selectedTool}) hit quota limit. Initiating fallback...`);
        // Fallback 1: Try without grounding tools using gemini-3.1-flash-lite
        try {
          actualModelUsed = 'gemini-3.1-flash-lite';
          toolUsedEffectively = 'none';
          response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents,
            config: {
              systemInstruction: KANCHAN_PATIL_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
        } catch (secondaryError: any) {
          console.warn("Secondary Gemini call also hit quota limit. Using knowledge base fallback.", secondaryError);
          const kbResponse = generateKnowledgeBaseResponse(userQuery);
          return res.json({
            text: kbResponse.text,
            modelUsed: 'gemini-knowledge-base',
            toolUsed: 'none',
            grounding: {
              webSources: [],
              mapPlaces: kbResponse.mapPlaces,
              searchQueries: [],
            },
          });
        }
      } else {
        throw primaryError;
      }
    }

    const replyText = response?.text || 'Thank you for reaching out to Kanchan Patil Group.';

    // Extract grounding sources
    const candidate = response?.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];

    const webSources: Array<{ title: string; uri: string }> = [];
    const mapPlaces: Array<{ title: string; uri: string; address?: string }> = [];

    for (const chunk of groundingChunks) {
      if ((chunk as any).web?.uri) {
        webSources.push({
          title: (chunk as any).web.title || (chunk as any).web.uri,
          uri: (chunk as any).web.uri,
        });
      }
      if ((chunk as any).maps?.uri) {
        mapPlaces.push({
          title: (chunk as any).maps.title || "Kanchan Patil Farm's Location",
          uri: (chunk as any).maps.uri,
          address: (chunk as any).maps.address,
        });
      }
    }

    // Always include Kanchan Patil Farm's place link if user asked about location or if map tool was intended
    if ((selectedTool === 'maps' || /\b(map|where|locate|location|direction|route|reach|address|near|distance)\b/i.test(userQuery)) && mapPlaces.length === 0) {
      mapPlaces.push({
        title: "Kanchan Patil Farm's Campus",
        uri: "https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr",
        address: "Shindawane Road, Kaleshivar Mala, Uruli Kanchan, Pune, Maharashtra 412202"
      });
    }

    // Return structured payload
    res.json({
      text: replyText,
      modelUsed: actualModelUsed,
      toolUsed: toolUsedEffectively,
      grounding: {
        webSources,
        mapPlaces,
        searchQueries: groundingMetadata?.webSearchQueries || [],
      },
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    let errorMessage = error?.message || 'Failed to generate response. Please try again.';
    try {
      if (typeof error?.message === 'string') {
        const parsed = JSON.parse(error.message);
        if (parsed?.error?.message) {
          errorMessage = parsed.error.message;
        }
      }
    } catch {
      // ignore JSON parse error
    }

    res.status(500).json({
      error: errorMessage,
      code: error?.status || 500
    });
  }
});

// POST /api/transcribe - Transcribe user audio with gemini-3.5-transcribe and multimodal gemini-3.8-flash fallback
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audio, mimeType = 'audio/webm' } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'Audio payload (base64) is required.' });
    }

    // Clean MIME type header (e.g., 'audio/webm;codecs=opus' -> 'audio/webm')
    const cleanMime = (mimeType || 'audio/webm').split(';')[0].trim();

    const audioPart = {
      inlineData: {
        mimeType: cleanMime,
        data: audio,
      },
    };

    let transcription = '';
    let modelUsed = 'gemini-3.5-transcribe';

    // Helper to clean up any unwanted model comments/placeholders
    const cleanTranscriptionText = (rawText: string) => {
      let t = (rawText || '').trim();
      // Remove wrapping quotes
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        t = t.slice(1, -1).trim();
      }
      // Check for silence/no speech indicators
      const lower = t.toLowerCase();
      if (
        lower === 'silence' ||
        lower === '[silence]' ||
        lower === '(silence)' ||
        lower === 'no speech detected' ||
        lower === '[no speech detected]' ||
        lower === '(no speech detected)' ||
        lower === 'no speech' ||
        lower === '[inaudible]' ||
        lower === '(inaudible)' ||
        lower === 'none' ||
        lower === '[none]' ||
        lower.startsWith('no audio') ||
        lower.startsWith('audio contains no speech') ||
        lower.startsWith('there is no speech')
      ) {
        return '';
      }
      return t;
    };

    // Primary attempt: gemini-3.5-transcribe
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [
            audioPart,
            {
              text: 'Transcribe this spoken audio into accurate, natural text. The speaker may ask about Kanchan Patil Group, Gavran poultry, eggs, nursery, plants, or location in English, Hindi, or Marathi. Output only the verbatim transcription. Do not add markdown formatting, quotes, or commentary.',
            },
          ],
        },
      });
      transcription = cleanTranscriptionText(response?.text || '');
    } catch (primaryErr: any) {
      console.warn('gemini-3.5-transcribe attempt notice:', primaryErr?.message || primaryErr);
    }

    // Fallback attempt: gemini-3.8-flash (multimodal audio transcription)
    if (!transcription) {
      try {
        modelUsed = 'gemini-3.8-flash';
        const flashResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: {
            parts: [
              audioPart,
              {
                text: 'Listen to this spoken audio carefully. Transcribe any speech verbatim in English, Hindi, or Marathi. Common topics include Kanchan Patil Farm, Gavran eggs, Uruli Kanchan, nursery plants, pricing, and location. Return ONLY the transcribed words. If completely silent, return an empty response.',
              },
            ],
          },
        });
        transcription = cleanTranscriptionText(flashResponse?.text || '');
      } catch (fallbackErr: any) {
        console.warn('gemini-3.8-flash transcription fallback notice:', fallbackErr?.message || fallbackErr);
      }
    }

    res.json({
      transcription,
      modelUsed,
      noSpeechDetected: !transcription,
    });
  } catch (error: any) {
    console.error('Error in /api/transcribe:', error);
    let errorMessage = error?.message || 'Audio transcription failed.';
    try {
      if (typeof error?.message === 'string') {
        const parsed = JSON.parse(error.message);
        if (parsed?.error?.message) {
          errorMessage = parsed.error.message;
        }
      }
    } catch {
      // ignore
    }

    res.status(500).json({
      error: errorMessage,
      code: error?.status || 500,
    });
  }
});

// Vite Middleware mounting
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kanchan Patil Group Full-Stack App listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
