   // src/pages/Contact.js
   import React, { useState } from 'react';

   const Contact = () => {
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       subject: '',
       message: '',
     });

     const handleChange = (e) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value,
       });
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       // Send form data to the backend
       try {
         const response = await fetch('/api/send-email', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
         });
         if (response.ok) {
           alert('Email sent successfully!');
         } else {
           alert('Failed to send email.');
         }
       } catch (error) {
         console.error('Error sending email:', error);
       }
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           name="name"
           placeholder="Your Name"
           value={formData.name}
           onChange={handleChange}
           required
         />
         <input
           type="email"
           name="email"
           placeholder="Your Email"
           value={formData.email}
           onChange={handleChange}
           required
         />
         <input
           type="text"
           name="subject"
           placeholder="Subject"
           value={formData.subject}
           onChange={handleChange}
           required
         />
         <textarea
           name="message"
           placeholder="Your Message"
           value={formData.message}
           onChange={handleChange}
           required
         />
         <button type="submit">Send</button>
       </form>
     );
   };

   export default Contact;