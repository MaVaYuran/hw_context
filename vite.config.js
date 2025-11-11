import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
//svg картинки можем использовать как реакт-компоненты
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
});
