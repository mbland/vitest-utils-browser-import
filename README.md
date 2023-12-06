# Vitest >=1.0.0-beta.5 config.base browser test error demo

Using Vitest 1.0.0-beta.5 or later (including v1.0.1) when vite.config.js
defines [`base`][] produces the following error when running browser tests:

```text
TypeError: Failed to fetch dynamically imported module: http://localhost:5173/@id/vitest/utils
This error originated in "demo.test.js" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
```

This demo repo helped me determine the root cause:

- [vitejs/vite#5657: fix!: return 404 for resources requests outside the base
  path](https://github.com/vitejs/vite/pull/5657) made Vite reject URLs outside
  of `config.base`.
- This change became part of [Vite
5.0.0-beta.8](https://github.com/vitejs/vite/commits/v5.0.0-beta.8)
- Vitest's dependency on Vite was bumped to `^5.0.0-beta.15` as part of
  [vitest-dev/vitest#4368: chore!: update vite@5 and
  rollup@4](https://github.com/vitest-dev/vitest/pull/4368)
- This change became part of [Vitest
  1.0.0-beta.5](https://github.com/vitest-dev/vitest/commits/v1.0.0-beta.5)

This issue was filed just before I got the chance, so I'll attach my info there:

- [vitest-dev/vitest: unhandled error with browser tests and modified base
  #4686](https://github.com/vitest-dev/vitest/issues/4686)

## Reproduction steps

These are distilled from the steps recorded in the commit messages of this repo.

### Initial setup for last good combination

Clone all these repos in the same directory:

```sh
git clone https://github.com/mbland/vitest-utils-browser-import.git
git clone https://github.com/vitejs/vite.git
git clone https://github.com/vitest-dev/vitest.git
```

Restore Vite and Vitest to the last versions that worked together without
producing this error:

```sh
cd vite
git reset --hard v5.0.0-beta.7

# Not needed the first time, but for each rebuild:
rm -rf node_modules packages/*/node_modules

pnpm i --ignore-scripts --frozen-lockfile
pnpm build

cd ../vitest
git reset --hard v1.0.0-beta.4

# Same as above:
rm -rf node_modules packages/*/node_modules

pnpm i --ignore-scripts --frozen-lockfile
pnpm build

cd ../vitest-utils-browser-import
pnpm i --ignore-scripts
pnpm test
```

This should allow the Vitest UI to run and for the test (which does nothing but
return `null`) to pass.

### Setup failure with Vite commit

To reproduce the error, follow the same steps as above for the first Vite build:

```sh
cd ../vite
git reset --hard 40fd2d9bf4073420e6c334f48dc3b63558b688ce
rm -rf node_modules packages/*/node_modules
pnpm i --ignore-scripts --frozen-lockfile
pnpm build

cd ../vitest-utils-browser-import
pnpm i --ignore-scripts
pnpm test
```

This should produce the same failure as above.

### Workaround

The workaround is to delete the `config.base` value in `vitest.config.js`. A
version of this is already encoded here:

```sh
pnpm test:workaround
```

[`base`]: https://vitejs.dev/config/shared-options.html#base
