import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import fs from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.promises.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },
})
