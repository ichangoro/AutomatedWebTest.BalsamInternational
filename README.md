# AutomatedWebTest.BalsamInternational
Automation Code Assessment


# download java ver 18
https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html


## Project Description
This project is an automated end-to-end web testing framework for Balsam International, built using Playwright Test for JavaScript/TypeScript. It covers key user flows such as searching, adding to cart, and validating cart operations, with detailed reporting via Allure.

## Framework Setup and Dependencies

- [Node.js]
- [Playwright Test]
- [Allure Reporter]
- [Java JDK]

## Set up guide.
    1. Install Node.js
        Download and install Node.js (recommended: v18 or higher).
    2. Install Java JDK 
        Download and install Java JDK 18 (required for Allure report generation). - here's what i used for this project (https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) 
    3. Once install Set JAVA_HOME on Windows (you can watch it here: https://www.youtube.com/watch?v=yGxCQisOL1A)
            a.) Find your Java installation path
                - For example: C:\Program Files\Java\jdk-18.0.2
            b.) Copy the path
                - Open File Explorer, navigate to your JDK folder, and copy the full path.
            c.) Open System Properties
                - Press Win + S and search for Environment Variables, or:
                - Right-click on This PC > Properties > Advanced system settings > Environment Variables...
            d.) Add a new system variable
                - Under System variables, click New...
                - For Variable name, enter: JAVA_HOME
                - For Variable value, paste your JDK path (e.g., C:\Program Files\Java\jdk-18.0.2)
                - Click OK
            e.) Add Java to the PATH variable (optional but recommended)
                - In System variables, find and select the Path variable, then click Edit...
                - Click New and add: %JAVA_HOME%\bin
                - Click OK to save
            f.) Apply and close all dialogs
            g.) Verify JAVA_HOME
                - Open a new Command Prompt and run: java -version

## Clone and repository installation command
    1. Clone the repository
        git clone <https://github.com/ichangoro/AutomatedWebTest.BalsamInternational.git>
        cd AutomatedWebTest.BalsamInternational
    2. Install dependencies
        - npm install (you will notice that a node_modules folder will be available in your files tree)       
        - npm install -g allure-commandline
        - npx playwright install (to ensure all browser engines are installed.)
    3. After cloning default branch is set to main, please switch to the current work branch "feature/initialSetup".        
    4. check .env file is present and has the intended value "BASE_URL=https://www.balsamhill.com/"

## Running test - we have ways to run
    Option 1: Open the target test (specs\tests\addToCart.spec.ts) make sure file is open then press F5 (I have created a debugger for this repository)
    Option 2: Run via script : npx playwright test specs/tests/addToCart.spec.ts
    Option 3: Cross browser execution. [For this set up I have used chromium and firefox]
            - First go to playwright.config.ts
            - Uncomment the projects array and save
            - Execute the run test command : npx playwright test specs/tests/addToCart.spec.ts

## Generate allure report
    1. Run command <npm run allure>
        
## Result clean up        
    Every after run it is good practice to clean previous result, specially when you are running cross-browser
    Run command <npm run allure:cleanup> - this will remove previous result