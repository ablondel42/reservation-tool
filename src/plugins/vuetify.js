import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import { VTextField } from 'vuetify/components'

export default createVuetify({
  aliases: {
    VDateField: VTextField,
    VSearchField: VTextField,
  },
  defaults:{
    VDateField: {
      variant: "solo",
      class: "mx-auto",
      rounded: "lg",
      hideDetails: true,
      type: "date",
      flat: true,
    },
    VSearchField: {
      variant: "solo",
      class: "mx-auto",
      rounded: "lg",
      hideDetails: true,
      flat: true,
    },
    global: {
      ripple: false,
    },
    VToolbar: {
      class: 'bg-primary',
    },
  },
  theme: {
    defaultTheme: 'dark',
    variations: {
      colors: ['primary', 'secondary', 'surface', 'background', 'accent', 'error', 'warning', 'info', 'success'],
      lighten: 5,
      darken: 4,
    },
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: colors.teal.base,
          secondary: colors.lightBlue.base,
          surface: colors.grey.darken3,
          background: colors.grey.darken4,
          accent: colors.indigo.base,
          error: colors.red.base,
          warning: colors.deepOrange.base,
          info: colors.blue.base,
          success: colors.lightGreen.base,
        }
      }
    }
  },
})
