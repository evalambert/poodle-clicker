import { defineConfig } from 'vite';
import fsExtra from 'fs-extra';

export default defineConfig({
  base: '/cookie-clicker/',

  // ... altre configurazioni ...

  build: {
    // ... altre configurazioni di build ...

    // Aggiungi questo passo post-build
    afterBuild() {
      // Copia i file da public a dist
      fsExtra.copySync('public', 'dist');
    },
  },
});

