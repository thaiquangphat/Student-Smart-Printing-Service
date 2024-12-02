import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  addDoc,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCga3kK8X8j8ye2GMIH6ptAQNWxu7VSJFs",
  authDomain: "hcmut-spss.firebaseapp.com",
  projectId: "hcmut-spss",
  storageBucket: "hcmut-spss.appspot.com",
  messagingSenderId: "402042921432",
  appId: "1:402042921432:web:6343ee3a221662e2bad2ad",
};

initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();

// initialize a provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // Forces account selection even when one account is available (optional)
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const createUserFromAuth = async (userAuth, additionalInfo = {}) => {
  const newUserRef = doc(db, "users", userAuth.uid);
  const data = await getDoc(newUserRef);

  if (!data.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(newUserRef, {
        displayName,
        email,
        date,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(`Error creating user document: ${error}`);
    }
  }

  return newUserRef;
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
export const signOutUser = async () => await signOut(auth);

export const getPrinters = async (coso) => {
  const printersRef = await getDocs(
    collection(db, `printers/location${coso}/printersAtLocation${coso}`)
  );

  let printersList = [];
  printersRef.forEach((doc) => {
    printersList.push({ ...doc.data() });
  });
  return printersList;
};

export const getUserInfo = async (currentUser) => {
  if (currentUser) {
    let userInfo = {};
    const usersRef = await getDocs(collection(db, `users`));
    usersRef.forEach((doc) => {
      if (doc.id == currentUser.uid) userInfo = { ...doc.data() };
    });
    return userInfo;
  } else {
    console.log("No user logged in");
  }
};

export const getBuyHistory = async (currentUser) => {
  if (currentUser) {
    let buyHis = [];
    const hisRef = await getDocs(
      collection(db, `users/${currentUser.uid}/buyHistory`)
    );

    hisRef.forEach((doc) => {
      const { date, giatien, khogiay, paid } = doc.data();
      let { soluonggiay } = doc.data();
      if (khogiay == "A4") soluonggiay = Number(soluonggiay);
      else if (khogiay == "A3") soluonggiay = Number(soluonggiay) * 2;
      else soluonggiay = Number(soluonggiay) / 2;
      buyHis.push({ date, giatien, soluonggiay, paid, ma: doc.id });
    });

    return buyHis;
  }
};

export const updateBuyHistory = async (currentUser, data) => {
  await addDoc(collection(db, `users/${currentUser.uid}/buyHistory`), data);
};

export const getPrintHistory = async (currentUser) => {
  if (currentUser) {
    let printHis = [];
    const printRef = await getDocs(
      collection(db, `users/${currentUser.uid}/printHistory`),
      orderBy("date", "desc")
    );

    printRef.forEach((doc) => {
      const { date, printerCode, name, numPage, printed, khoGiay } = doc.data();
      printHis.push({
        date,
        printerCode,
        name,
        numPage,
        printed,
        khoGiay,
        ma: doc.id,
      });
    });
    return printHis;
  }
};

export const updatePrintHistory = async (currentUser, data) => {
  await addDoc(collection(db, `users/${currentUser.uid}/printHistory`), data);
  // console.log(data);
};
