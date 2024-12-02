# Description.

231 CO3001 - Software Engineering Assignment: A smart printing service for students at HCMUT.

## Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Contributors](#contributors)

## Demo

<video src="https://youtu.be/7C51aL3ncKY" width="320" height="240" controls></video>

## Installation

0. Make sure you have `npm` install on your machine before proceeding with the installation
1. Clone the repository to your local machine using `git clone https://github.com/thaiquangphat/Student-Smart-Printing-Service.git` and `cd hcmut-spss`
2. Install dependencies with `npm install`
3. (Optional) If you want to use your own firebase project, simply change to your own configuration at `~/src/ultis/firebase/firebase.js`

   ```javascript
   const firebaseConfig = {
     apiKey: "",
     authDomain: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
   };
   ```

4. Run the application with `npm start` . Open [http://localhost:3000](http://localhost:3000) to view it in your browser. You can sign in as:

   - A user using your own Google account or :

     ```
     spssuser.hcmut@gmail.com
     @abc1234
     ```

   - A NVIA:
     ```
     spssnvia.hcmut@gmail.com
     @abc1234
     ```

## Contributors

Thai Quang Phat – 2252606
Phan Quang Minh – 2212074
Phan Quang Nhan – 2053286
Phung Gia Minh Khoi – 2252381
Thai Quang Du – 2252136
