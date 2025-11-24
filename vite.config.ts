import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Gzip compression for production
    mode === "production" && viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Only compress files > 10KB
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
    // Brotli compression for production (better compression than gzip)
    mode === "production" && viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Fix Safari 10/11 bugs
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    
    // Code splitting and chunk strategy
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: (id) => {
          // Vendor chunk for node_modules
          if (id.includes('node_modules')) {
            // Separate large libraries for better caching
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-vendor';
            }
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icon-vendor';
            }
            if (id.includes('canvas-confetti')) {
              return 'confetti-vendor';
            }
            // All other vendor code
            return 'vendor';
          }
          
          // Separate page chunks
          if (id.includes('/src/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0].toLowerCase();
            return `page-${pageName}`;
          }
          
          // Separate component chunks by category and priority
          if (id.includes('/src/components/campaign/')) {
            return 'campaign-components';
          }
          if (id.includes('/src/components/partners/')) {
            return 'partner-components';
          }
          if (id.includes('/src/components/funnel/')) {
            return 'funnel-components';
          }
          if (id.includes('/src/components/ui/')) {
            return 'ui-components';
          }
          
          // Separate heavy homepage components for lazy loading
          if (id.includes('/src/components/Features.tsx')) {
            return 'home-features';
          }
          if (id.includes('/src/components/BusinessSection.tsx')) {
            return 'home-business';
          }
          if (id.includes('/src/components/Pricing.tsx')) {
            return 'home-pricing';
          }
          if (id.includes('/src/components/Testimonials.tsx')) {
            return 'home-testimonials';
          }
          if (id.includes('/src/components/FAQ.tsx')) {
            return 'home-faq';
          }
        },
        
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    
    // Chunk size warnings - reduced for better granularity
    chunkSizeWarningLimit: 500, // Warn for chunks > 500KB (more aggressive)
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Source maps for production debugging (disable for maximum performance)
    sourcemap: mode === 'development',
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    
    // Enable module preload for faster navigation
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps) => {
        // Preload critical chunks
        return deps.filter(dep => {
          // Preload React and vendor chunks immediately
          return dep.includes('react-vendor') || 
                 dep.includes('vendor') ||
                 dep.includes('ui-components');
        });
      },
    },
  },
  
  // Optimize dependencies during dev
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
    exclude: [], // Allow all deps to be optimized
    esbuildOptions: {
      // Handle CJS/ESM interop
      mainFields: ['module', 'main'],
    },
  },
}));
