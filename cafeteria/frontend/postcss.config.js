// frontend/postcss.config.js
import postcssTailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssTailwind(),   // ← usa el plugin separado
    autoprefixer(),
  ],
};
