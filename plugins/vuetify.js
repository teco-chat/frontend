import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { customSVGs } from '~/assets/customSvg';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            secondary: '#2BB6AE'
          }
        },
      },
    },
    icons: {
      sets: {
        custom: customSVGs,
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})