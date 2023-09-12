import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: false,
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/variables.scss";`
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/element.scss" as *;
        `
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    svgLoader(),
    Icons({ autoInstall: true }),
    AutoImport({
      imports: ["vue", "vue-router", "vue-i18n"],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        }),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        }),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: 'src/components.d.ts'
    }),
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [resolve(__dirname, 'i18n/locales/**')]
    })
  ]
})
