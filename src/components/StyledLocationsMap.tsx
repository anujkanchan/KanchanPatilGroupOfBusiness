// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, ExternalLink, Clock, Phone, Sparkles, Compass } from 'lucide-react';
import { HenIcon } from './HenIcon';
import { Leaf } from 'lucide-react';

export const KANCHAN_PATIL_FARMS_MAP_URL =
  "https://www.google.com/maps/place/Kanchan+Patil+Farm's/@18.4731016,74.1312257,17z/data=!4m14!1m7!3m6!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!2sKanchan+Patil+Farm's!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr!3m5!1s0x3bc2e10034f448b3:0x1ed5b4c6303039e2!8m2!3d18.4730965!4d74.1338006!16s%2Fg%2F11z61wsxvr";

export interface LocationItem {
  id: 'farms' | 'poultry' | 'nursery';
  name: string;
  category: string;
  description: string;
  hours: string;
  phone: string;
  position: { lat: number; lng: number };
  badgeColor: string;
  tag: string;
  directionsUrl: string;
}

export const K_GROUP_LOCATIONS: LocationItem[] = [
  {
    id: 'farms',
    name: "Kanchan Patil Farm's",
    category: 'Estate Headquarters & Agro Campus',
    description: "Main agricultural estate hosting Gavran Poultry Farms, K Group high-tech nursery facilities, and natural organic farmlands in Uruli Kanchan.",
    hours: 'Mon - Sun: 7:30 AM - 7:30 PM',
    phone: '+91 7517004343',
    position: { lat: 18.4730965, lng: 74.1338006 },
    badgeColor: '#FFD700',
    tag: 'Main Campus',
    directionsUrl: KANCHAN_PATIL_FARMS_MAP_URL
  },
  {
    id: 'poultry',
    name: 'Gavran Poultry Farms',
    category: 'Free-Range Native Poultry & Organic Eggs',
    description: 'Specialized bio-secure farm raising authentic native Gavran country birds and harvesting daily fresh organic eggs in hygienic natural pastures.',
    hours: 'Mon - Sat: 8:00 AM - 7:00 PM',
    phone: '+91 7517004343',
    position: { lat: 18.47335, lng: 74.13360 },
    badgeColor: '#D4AF37',
    tag: 'Poultry Unit',
    directionsUrl: KANCHAN_PATIL_FARMS_MAP_URL
  },
  {
    id: 'nursery',
    name: 'K Group of Nursery',
    category: 'Climate-Controlled Flora & Greenhouse Nursery',
    description: 'Premier nursery cultivating healthy netpot live plants, 6-inch Tecoma ornamentals, shade trees, and offering commercial landscaping consultation.',
    hours: 'Mon - Sun: 7:30 AM - 6:30 PM',
    phone: '+91 7517004343',
    position: { lat: 18.47285, lng: 74.13410 },
    badgeColor: '#1F6B3A',
    tag: 'Nursery Unit',
    directionsUrl: KANCHAN_PATIL_FARMS_MAP_URL
  }
];

// Smooth camera controller for panning and zooming between locations
function MapCameraController({ activeLocationId }: { activeLocationId: 'all' | 'farms' | 'poultry' | 'nursery' }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (activeLocationId === 'all') {
      map.panTo({ lat: 18.4730965, lng: 74.1338006 });
      map.setZoom(17);
    } else {
      const loc = K_GROUP_LOCATIONS.find((l) => l.id === activeLocationId);
      if (loc) {
        map.panTo(loc.position);
        map.setZoom(18);
      }
    }
  }, [map, activeLocationId]);

  return null;
}

interface SingleLocationMarkerProps {
  key?: React.Key;
  location: LocationItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function SingleLocationMarker({ location, isOpen, onOpen, onClose }: SingleLocationMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const isFarms = location.id === 'farms';
  const isPoultry = location.id === 'poultry';

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={location.position}
        title={location.name}
        onClick={onOpen}
      >
        <div
          className={`group flex items-center gap-2 p-1.5 rounded-2xl cursor-pointer transition-all duration-300 transform ${
            isOpen ? 'scale-110 -translate-y-1 z-30' : 'hover:scale-105'
          } ${
            isFarms
              ? 'bg-[#141414] border-2 border-[#FFD700] shadow-[0_0_24px_rgba(255,215,0,0.7)] ring-2 ring-[#FFD700]/30'
              : isPoultry
              ? 'bg-[#141414] border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.6)]'
              : 'bg-[#141414] border-2 border-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.5)]'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              isFarms
                ? 'bg-gradient-to-br from-[#FFD700] to-[#D4AF37] text-black shadow-md'
                : isPoultry
                ? 'bg-[#D4AF37] text-black'
                : 'bg-[#1F6B3A] text-white'
            }`}
          >
            {isFarms ? (
              <MapPin className="w-5 h-5 text-black" />
            ) : isPoultry ? (
              <HenIcon className="w-5 h-5 text-black" />
            ) : (
              <Leaf className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="pr-2 hidden sm:block">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider block leading-none ${
                isFarms ? 'text-[#FFD700]' : isPoultry ? 'text-[#D4AF37]' : 'text-[#25D366]'
              }`}
            >
              {location.tag}
            </span>
            <span className="text-xs font-bold text-white whitespace-nowrap">
              {location.name}
            </span>
          </div>
        </div>
      </AdvancedMarker>

      {isOpen && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onClose}
          maxWidth={330}
        >
          <div className="p-3 text-slate-900 bg-white rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white ${
                  isFarms ? 'bg-[#b8860b]' : isPoultry ? 'bg-[#996515]' : 'bg-[#1e7e34]'
                }`}
              >
                {location.tag}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Kanchan Patil Farm's</span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 mb-1">
              {location.name}
            </h4>

            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              {location.description}
            </p>

            <div className="space-y-1 mb-3 text-[11px] text-slate-700 border-t border-slate-100 pt-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{location.hours}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{location.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                Open in Maps
              </a>
              <a
                href="https://wa.me/917517004343"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center justify-center transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export const StyledLocationsMap: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<'all' | 'farms' | 'poultry' | 'nursery'>('all');
  const [openInfoWindowId, setOpenInfoWindowId] = useState<'farms' | 'poultry' | 'nursery' | null>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const handleSelectTab = (id: 'all' | 'farms' | 'poultry' | 'nursery') => {
    setActiveLocationId(id);
    if (id === 'all') {
      setOpenInfoWindowId(null);
    } else {
      setOpenInfoWindowId(id);
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-[#0d0d0d] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col">
      {/* Top Bar with Location Selectors & Details */}
      <div className="p-4 sm:p-5 border-b border-[#D4AF37]/20 bg-[#141414]/90 flex flex-wrap items-center justify-between gap-3">
        <a
          href={KANCHAN_PATIL_FARMS_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFD700] group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD700] block">
              Interactive Estate Map
            </span>
            <h4 className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors flex items-center gap-1.5">
              Kanchan Patil Farm's Campus
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </h4>
          </div>
        </a>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#080808] p-1 rounded-xl border border-[#D4AF37]/20">
          <button
            onClick={() => handleSelectTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLocationId === 'all'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Campus
          </button>
          <button
            onClick={() => handleSelectTab('farms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              activeLocationId === 'farms'
                ? 'bg-[#FFD700] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Kanchan Patil Farm's
          </button>
          <button
            onClick={() => handleSelectTab('poultry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              activeLocationId === 'poultry'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <HenIcon className="w-3.5 h-3.5" />
            Poultry Farm
          </button>
          <button
            onClick={() => handleSelectTab('nursery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              activeLocationId === 'nursery'
                ? 'bg-[#1F6B3A] text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            Nursery
          </button>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[360px] sm:h-[400px] bg-[#111111]">
        {apiKey ? (
          <APIProvider apiKey={apiKey} libraries={['marker']}>
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={{ lat: 18.4730965, lng: 74.1338006 }}
              defaultZoom={17}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              className="w-full h-full"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              <MapCameraController activeLocationId={activeLocationId} />

              {K_GROUP_LOCATIONS.map((loc) => (
                <SingleLocationMarker
                  key={loc.id}
                  location={loc}
                  isOpen={openInfoWindowId === loc.id}
                  onOpen={() => {
                    setActiveLocationId(loc.id);
                    setOpenInfoWindowId(loc.id);
                  }}
                  onClose={() => setOpenInfoWindowId(null)}
                />
              ))}
            </Map>
          </APIProvider>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <MapPin className="w-10 h-10 text-[#FFD700] mb-2 animate-bounce" />
            <p className="text-sm font-semibold text-white">Kanchan Patil Farm's, Uruli Kanchan, Pune</p>
            <p className="text-xs text-gray-400 max-w-sm mt-1">
              Interactive satellite & vector maps for Kanchan Patil Farm's, Gavran Poultry Farms, and K Group of Nursery.
            </p>
          </div>
        )}

        {/* Floating Quick Navigation Trigger */}
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 flex items-center gap-2 z-10 pointer-events-auto">
          <a
            href={KANCHAN_PATIL_FARMS_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-black/90 backdrop-blur-md text-[#FFD700] border border-[#D4AF37]/50 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FFD700] hover:text-black transition-all shadow-xl cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Kanchan Patil Farm's on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Location Details Footer Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/15 bg-[#141414]/95 p-4 sm:p-5">
        {/* Kanchan Patil Farm's Main */}
        <div
          onClick={() => handleSelectTab('farms')}
          className={`p-3 rounded-2xl cursor-pointer transition-all ${
            activeLocationId === 'farms' ? 'bg-[#FFD700]/10 border border-[#FFD700]/40' : 'hover:bg-white/5'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
                <MapPin className="w-4 h-4 text-[#FFD700]" />
              </div>
              <h5 className="font-bold text-white text-sm">
                Kanchan Patil Farm's
              </h5>
            </div>
            <span className="text-[10px] font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded-full border border-[#FFD700]/30">
              Campus HQ
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed mb-2.5">
            Main agricultural estate & corporate campus in Uruli Kanchan, Pune.
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium text-[11px]">Shindawane Road, Pune</span>
            <a
              href={KANCHAN_PATIL_FARMS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#FFD700] hover:underline font-bold inline-flex items-center gap-1"
            >
              Open Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Poultry Details */}
        <div
          onClick={() => handleSelectTab('poultry')}
          className={`p-3 rounded-2xl cursor-pointer transition-all ${
            activeLocationId === 'poultry' ? 'bg-[#FFD700]/10 border border-[#D4AF37]/40' : 'hover:bg-white/5'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#FFD700]">
                <HenIcon className="w-4 h-4 text-[#FFD700]" />
              </div>
              <h5 className="font-bold text-white text-sm">
                Gavran Poultry Farms
              </h5>
            </div>
            <span className="text-[10px] font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
              Open 8 AM - 7 PM
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed mb-2.5">
            Free-range pasture grounds, pure native breeding roosters & daily fresh Gavran organic eggs.
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium text-[11px]">Kaleshivar Mala, Uruli Kanchan</span>
            <a
              href={KANCHAN_PATIL_FARMS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#FFD700] hover:underline font-bold inline-flex items-center gap-1"
            >
              Get Directions <Navigation className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Nursery Details */}
        <div
          onClick={() => handleSelectTab('nursery')}
          className={`p-3 rounded-2xl cursor-pointer transition-all ${
            activeLocationId === 'nursery' ? 'bg-[#1F6B3A]/20 border border-[#25D366]/40' : 'hover:bg-white/5'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1F6B3A]/40 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <Leaf className="w-4 h-4 text-[#25D366]" />
              </div>
              <h5 className="font-bold text-white text-sm">
                K Group of Nursery
              </h5>
            </div>
            <span className="text-[10px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30">
              Open 7:30 AM - 6:30 PM
            </span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed mb-2.5">
            Climate-controlled greenhouse, wholesale netpots, flowering ornamentals & landscape trees.
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium text-[11px]">Shindawane Road, Uruli Kanchan</span>
            <a
              href={KANCHAN_PATIL_FARMS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#25D366] hover:underline font-bold inline-flex items-center gap-1"
            >
              Get Directions <Navigation className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
