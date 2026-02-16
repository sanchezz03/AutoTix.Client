# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Screens:

1) <img width="1058" height="579" alt="image" src="https://github.com/user-attachments/assets/68c1b1f7-6756-484c-9657-ba944d97d9ad" />
2) <img width="1058" height="573" alt="image" src="https://github.com/user-attachments/assets/8e67a92b-5072-4ab5-af19-40626c1e884c" />
3) <img width="1052" height="568" alt="image" src="https://github.com/user-attachments/assets/88f3c23f-8322-4ad7-9058-cac277ba9d10" />
4) <img width="1057" height="570" alt="image" src="https://github.com/user-attachments/assets/f41674c7-c1d4-4a93-b5e0-afc9ef39e1cb" />
5) <img width="1067" height="580" alt="image" src="https://github.com/user-attachments/assets/85c39aa7-22ac-4669-b240-bca78d0867a9" />
6) <img width="1076" height="594" alt="image" src="https://github.com/user-attachments/assets/a06e31e8-2948-41ea-99c3-ee0eaf4650ee" />
7) <img width="1063" height="579" alt="image" src="https://github.com/user-attachments/assets/91ead574-7699-4300-95a8-064230fa033e" />
8) <img width="1034" height="562" alt="image" src="https://github.com/user-attachments/assets/e47af8bb-afa4-46fa-a6d1-20e25ff9e5a0" />
9) <img width="1030" height="566" alt="image" src="https://github.com/user-attachments/assets/28e86461-4aa4-4de1-ae81-911e420ed409" />
10) <img width="1050" height="569" alt="image" src="https://github.com/user-attachments/assets/f5c64fcb-952e-41f6-a550-ea3497636663" />
11) <img width="1053" height="576" alt="image" src="https://github.com/user-attachments/assets/3b868929-e5ff-4b18-a59a-27474036a27c" />
12) <img width="1046" height="566" alt="image" src="https://github.com/user-attachments/assets/29e84950-713d-43d5-bc42-199e0dfd2566" />
13) <img width="1059" height="578" alt="image" src="https://github.com/user-attachments/assets/0c3f0830-55e6-4852-bd0b-805230192cb8" />
