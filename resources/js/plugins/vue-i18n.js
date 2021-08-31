import {createApp} from 'vue'
import { createI18n } from 'vue-i18n'
import messages from '../locale'

export const i18n =createI18n({
  	locale: 'mm',
	fallbackLocale: 'mm',
	messages,
})

export default {
	i18n,
};