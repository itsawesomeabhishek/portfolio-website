# Contributing Guide

Thank you for considering contributing to the **Neo-Brutalist Developer Portfolio & Headless CMS**! We welcome bug fixes, documentation improvements, UI enhancements, and new feature suggestions.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all contributors with respect and professionalism.

---

## Development Workflow

### 1. Fork & Clone
1. Fork the repository to your own GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/portfolio-website.git
   cd portfolio-website
   ```
3. Set upstream remote:
   ```bash
   git remote add upstream https://github.com/itsawesomeabhishek/portfolio-website.git
   ```

### 2. Branch Naming Convention
Create a dedicated branch for your work:
```bash
git checkout -b <type>/<short-description>
```
Examples:
- `feat/dark-mode-toggle`
- `fix/admin-session-expiry`
- `docs/update-readme`
- `refactor/cloudinary-upload`

### 3. Local Setup & Testing
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and configure your environment.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Verify tests and typechecking:
   ```bash
   npm run typecheck
   npm test
   ```

---

## Coding Standards

- **TypeScript**: Strict typing is enabled. Avoid `any` where possible.
- **Styling**: Follow the existing neo-brutalist theme guidelines:
  - Strong, high-contrast borders: `border-2 border-ink`
  - Hard drop shadows: `shadow-hard`, `shadow-hard-sm`, `shadow-hard-lg`
  - Palette colors: `--neo-green`, `--neo-yellow`, `--neo-purple`, `--neo-pink`, `--neo-cyan`
- **Validation**: All user inputs in Server Actions must be validated with Zod schemas in `lib/validators.ts`.
- **Testing**:
  - Add or update unit tests in `__tests__/` when introducing new logic or components.
  - Ensure all existing tests pass (`npm test`).

---

## Commit Message Convention

We follow conventional commits:
- `feat: <description>`: Introduces a new feature
- `fix: <description>`: Resolves a bug
- `docs: <description>`: Documentation changes
- `style: <description>`: Formatting, UI styling without logic change
- `refactor: <description>`: Code change that neither fixes a bug nor adds a feature
- `test: <description>`: Adding or modifying tests
- `chore: <description>`: Maintenance tasks, dependency updates

---

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin <your-branch-name>
   ```
2. Open a Pull Request against the `main` branch of `itsawesomeabhishek/portfolio-website`.
3. Fill out the PR template with a clear description of your changes, motivation, and test results.
4. Respond to any code review feedback promptly.

Thank you for helping build an amazing open-source portfolio! 🚀
