if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Tv_AOjEvIz_67N_RV9ylO/_buildManifest.js",revision:"6822c4d5aaf7f92a59445cc0c6947e1d"},{url:"/_next/static/Tv_AOjEvIz_67N_RV9ylO/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/00cbbcb7-c4aec94acf9662a6.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/12038df7-0d0553d688b30883.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/184-437fafd06c91e9eb.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/3627521c-324b32ddf406d173.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/39209d7c-78d80f94f255d217.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/4f9d9cd8-f10dca9cfc54a2bd.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/5349c568-a28f780c25b49372.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/691-8583877aa40622d9.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/789-1865dd5cda99ff1e.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/889-49dd30aba640a8c2.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/8dc5345f-e1223e377b221e47.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/9081a741-4c669f1f9f67a01a.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/935-bade10b9b3915cc2.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/%5Bsignup%5D/page-2a0cf06e8b81b5f7.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/_not-found-246a067aa9cb51e8.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/discussions/%5Bid%5D/page-ce66562cdc285b86.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/discussions/error-9a1dd90efcf9d251.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/discussions/layout-cea629414fdd346c.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/discussions/loading-f87790faaee0b658.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/discussions/page-e577dc07b48846d0.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/layout-f9b1265b667530ec.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/loading-038d58985bb4a846.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/app/page-3b07bfcb2db09b16.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/bc9c3264-b7620d2e74a7f22c.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/ec3863c0-a736785f9d5b21b5.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/fcfb803e-14444171c2664ad5.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/fd9d1056-091750f1e8bc764e.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/framework-43665103d101a22d.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/main-app-3b43da231278d200.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/main-efb35f53fb65995a.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/pages/_app-174d3fc0b06857fe.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/pages/_error-1749fe2efd45c640.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-140ed7dfdc9b90eb.js",revision:"Tv_AOjEvIz_67N_RV9ylO"},{url:"/_next/static/css/7e79b2045f3eb0c3.css",revision:"7e79b2045f3eb0c3"},{url:"/_next/static/css/edc2be34dfda3d4c.css",revision:"edc2be34dfda3d4c"},{url:"/apple-touch-icon.png",revision:"38de1c9bc6766a3a1118609575b3c131"},{url:"/doc.png",revision:"5b5e88aae1cab82ee942799279a958b0"},{url:"/favicon.ico",revision:"7b72e94c68933a03ad77d9b2f6417662"},{url:"/icons/icon-192x192.png",revision:"5e707313b0bd08a3c11bcfe2f680ae11"},{url:"/icons/icon-256x256.png",revision:"6d25927dd2404627006b897db5ac5c2b"},{url:"/icons/icon-384x384.png",revision:"1073d8863abd569344e773a125291725"},{url:"/icons/icon-512x512.png",revision:"05206c61ad8eb5cfc8eea8aa9650a6ec"},{url:"/icons/maskable.png",revision:"842f52136e96ba3f14962f8754805703"},{url:"/icons/wcicon-48x48.png",revision:"a6aaf0074b74b27b1f3fc90d0feef18d"},{url:"/logo.png",revision:"48f55fad869f37e633fd763c8eeabc35"},{url:"/manifest.json",revision:"7ceafbe2efd0df6f658578d276b62b10"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/pdfdownload.png",revision:"95baab6b649e1f2ea8e6343d6b98fcab"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/txtfile.png",revision:"5dd706297b07ec37d0b4e1310dbe77df"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/whatsappdashbord.png",revision:"323c6a7197760ee1f37a3a7faaf0ea6f"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
