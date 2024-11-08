import React, { useEffect, useState } from 'react';

import SubscriptionForm from '../components/profile/SubscriptionForm';
import SubscriptionDetails from '../components/profile/SubscriptionDetails';
import basic from '../files/imgaes/free.png';
import premium from '../files/imgaes/premium.png';
import firebase from '../firebase/firebaseConfig';

const data = [
  {
    id: 1,
    src: basic,
    title: 'Free',
    price: '0',
    description: 'Free plan',
  },
  {
    id: 2,
    src: premium,
    title: 'Pro',
    price: '9.99',
    description: 'Pro plan',
  },
];

const SubscriptionPage = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [planType, setPlanType] = useState('');
  const serverAdress = process.env.SERVERADRESS || 'http://localhost:5000';
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid ?? '');
        setUserName(user.displayName ?? '');
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.on('value', (snapshot) => {
          const userVal = snapshot.val();
          console.log(userVal);
          if (userVal.subscription) {
            setPlanType(userVal.subscription.planType || '');
          } else {
            setPlanType('');
          }
        });
      } else {
        setUserId('');
        setUserName('');
      }
    });
  }, [userId]);

  const checkout = (price) => {
    fetch(`${serverAdress}/api/v1/create-subscription-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ plan: price, customerId: userId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((session) => {
        window.location = session.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center w-full mx-auto min-h-screen digonal-background overflow-x-hidden">
        <div className="flex justify-between items-center w-full px-6 h-20 bg-[#00000012">
          <div className="text-4xl font-bold text-white"> Hello </div>
          <div className="flex justify-center items-center gap-2">
            {!userId ? (
              <a
                href="/login"
                className="bg-white px-4 py-2 uppercase w-auto rounded-lg text xl text-[#4f7cff] font-semibold"
              >
                Login
              </a>
            ) : (
              <div className="flex justify-center items-center space-x-4">
                <span className="text-white text-xl">{userName}</span>
                <button className="bg-white px-4 py-2 w-auto rounded-lg text-base uppercase font-semibold text-[#4f7cff]">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid lg: grid-cols-2 sm: grid-cols-2 grid-cols-1 gap-[10%] z-50 place-items-center w-9/12 max-w-[1000px] mx-[500px] mt-20">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="bg-white px-6 py-8 rounded-xl h-[500px] text-[#4f7cff] w-full mx-auto grid place-items-center"
            >
              <div className="font-bold text-[40px]"> {item.title}</div>
              <img
                src={item.src}
                alt=""
                width={200}
                height={300}
                className="h-300"
              />
              <div>{item.description} </div>
              <div className="font-bold text-[30px]">${item.price}</div>
              <div className="mx-auto flex justify-center items-center my-3">
                {planType === item.title.toLowerCase() ? (
                  <button className="bg-green-600 text-white rounded-md text-base uppercase w-24 py-2 font-bold">
                    Subscribed
                  </button>
                ) : (
                  <button
                    onClick={() => checkout(Number(item.price))}
                    className="bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2 font-bold"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
