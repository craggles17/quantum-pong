# Quantum Pong - Makefile
# A quantum mechanics pong game with wavefunction physics

NPM := PATH="/opt/homebrew/bin:$$PATH" npm
NPX := PATH="/opt/homebrew/bin:$$PATH" npx

.PHONY: dev serve build test test-e2e deploy deploy-preview lint clean help

# Start local development server
dev:
	$(NPM) run dev

# Alias for dev
serve: dev

# Production build
build:
	$(NPM) run build

# Run unit tests
test:
	$(NPM) run test

# Run E2E tests
test-e2e:
	$(NPX) playwright test

# Run all tests
test-all: test test-e2e

# Deploy to production
deploy: build
	$(NPX) --yes netlify-cli deploy --prod --dir=dist

# Deploy preview
deploy-preview: build
	$(NPX) --yes netlify-cli deploy --dir=dist

# Linting/type checks
lint:
	$(NPM) run typecheck

# Clean build artifacts
clean:
	rm -rf dist node_modules/.vite

# Show available targets
help:
	@echo "Quantum Pong - Build System"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Development:"
	@echo "  dev           Start local dev server (hot reload)"
	@echo "  serve         Alias for dev"
	@echo ""
	@echo "Build:"
	@echo "  build         Production build to dist/"
	@echo "  clean         Remove build artifacts"
	@echo ""
	@echo "Quality:"
	@echo "  test          Run unit tests (Vitest)"
	@echo "  test-e2e      Run E2E tests (Playwright)"
	@echo "  test-all      Run all tests"
	@echo "  lint          Run type checking"
	@echo ""
	@echo "Deploy:"
	@echo "  deploy        Deploy to production (Netlify)"
	@echo "  deploy-preview Deploy preview (Netlify)"
