# Contributing

Thanks for your interest in contributing! Contributions are welcome and will be fully credited.

To keep things running smoothly we ask you to follow a few guidelines when contributing. Please read and understand this contribution guide before creating an issue or pull request.

## Etiquette

Be kind.

## Viability

If you have an idea for a feature, we'd prefer you open an issue before going to the trouble of writing code. We welcome your ideas, but we'd like to work with you to come up with solutions that work well for the project as a whole. We're usually pretty responsive, so it shouldn't take us long to figure out whether and how best to implement your idea.

## Procedure

Before filing an issue:

- Attempt to replicate the problem, to ensure that it wasn't a coincidence
- Check to make sure your feature suggestion isn't already present within the project
- Check the pull requests tab to ensure that your feature or bugfix isn't already in progress

Before submitting a pull request:

- Check the codebase to ensure that your feature doesn't already exist
- Check the pull requests to ensure that another person hasn't already submitted the feature or fix


## Development workflow

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> While it's possible to use [`npm`](https://github.com/npm/cli), the tooling is built around [`yarn`](https://classic.yarnpkg.com/), so you'll have an easier time if you use `yarn` for development.

While developing, you can run the [example app](/example/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

To run the example app on Web:

```sh
yarn example web
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn bootstrap`: setup project by installing all dependencies and pods.
- `yarn typescript`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn example start`: start the Metro server for the example app.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** This blog post is the perfect starting point: [Building a Great Pull Request](https://tighten.co/blog/building-a-great-pull-request).

When you're sending a pull request:

- **One pull request per feature** - If you want to do more than one thing, send multiple pull requests.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.