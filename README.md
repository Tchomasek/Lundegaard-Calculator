# Lundegaard Calculator
Calculator that takes loan size and load period and calculates monthly repaynemt amount. It also takes in account the option for insolvency insurance.

### How to launch this application:


Run backend server:

    cd backend
    node app.js


Run React App:

    yarn start

Run Jest tests:
    
    npm test


### Features:
- Ability to adjust loan size and loan period using slider or text input.
- API call is sent only after user stoped moving slider for half a second to prevent sending multiple API calls in short period of time.
- Validate both values - too high, too low, text is not allowed at all.
- If inserted value is out of range, the nearest allowed value is used and send via API after submiting by Enter or removing focus from text input.
- After sending API call there is half a second of simulated latency before response arrives - in the meantime spinner is displayed instead of result value.
- Instant adjustment of monthly payback based on insurance option (no need for API call).
- Simplified calculation of interest.
- React part written in Typescript.
- Simple rendering and snapshot Jest tests for two components.

![alt text](https://github.com/Tchomasek/Lundegaard-Calculator/blob/master/calculator_prtscr.png)
