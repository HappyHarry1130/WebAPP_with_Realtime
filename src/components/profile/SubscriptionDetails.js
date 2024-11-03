import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const SubscriptionDetails = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSubscription(docSnap.data());
        } else {
          console.log('No subscription data found');
        }
      }
    };

    fetchSubscription();
  }, []);

  if (!subscription) {
    return <div>Loading subscription details...</div>;
  }

  return (
    <div>
      <h2>Subscription Details</h2>
      <p>Status: {subscription.subscriptionStatus}</p>
      <p>Start Date: {new Date(subscription.subscriptionStart * 1000).toLocaleDateString()}</p>
      <p>End Date: {new Date(subscription.subscriptionEnd * 1000).toLocaleDateString()}</p>
    </div>
  );
};

export default SubscriptionDetails;