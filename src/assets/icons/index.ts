import type { App } from 'vue'

const all = import.meta.glob('./svg/*.svg', { eager: true })
const icons: { [x: string]: any } = {}

Object.keys(all).forEach((key) => {
  const keyWord = key.match(/\/svg\/(.*)\.svg/)?.[1]
  if (keyWord) icons[keyWord] = all[key]
})

export default function setupSvg(app: App<Element>) {
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component as any)
  }
}
