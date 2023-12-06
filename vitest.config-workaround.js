import viteConfig from './vite.config.js'

const vitestConfig = { ...viteConfig }
delete vitestConfig.base
export default vitestConfig
