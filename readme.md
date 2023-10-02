# Apingweb API Automation Test

## How to install

1. Clone the repository and navigate to the folder
2. Install the npm dependencies
   ```
   npm install
   ```
3. if you already have an user for testing, please navigate to fixtures/user.json and put your user credential there, example:
   ```
   {
    "email":"superman@gmail.com",
    "password":"123456"
   }
   ```
---

## How to run

1. run cypress in headless mode
```bash
npx cypress run
```

2. run cypress in headed mode
```bash
npx cypress open
```