# Cypress Test Automation Project

## Installation and Running Tests

### Clone the Repository

```bash
git clone https://github.com/your-repo/cypress-test.git
cd cypress-test
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
```

### Run Tests

Open Cypress Test Runner:

```bash
npm run cypress:open
```

Run Cypress tests in CI mode:

```bash
npm run cypress:ci
```

## CI Configuration

For GitHub Actions, ensure the following secrets are set in your repository settings:

- `BASE_URL`
- `USERNAME`
- `PASSWORD`

## Assumptions and Limitations

Tests are based on the current state of the Sauce Demo site.

### Known Issues

The homepage may encounter errors such as:

- `Unchecked runtime.lastError: The message port closed before a response was received.`
- `Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received.`
- `Failed to load resource: the server responded with a status of 404 ()`
- `inventory.html:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received`
- `cart.html:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received`
