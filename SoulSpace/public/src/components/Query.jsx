import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './query.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Query = () => {
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_gxjknga', 'template_gwr2v9n', form.current, {
        publicKey: 'bm7M66yzh3g-0ROmJ',
      })
      .then(
        () => {
          console.log('Message sent successfully..');
          toast.success("Message sent successfully!");
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Error try again");
        },
      );
  };
  return (
    <>
    <div className='sec-4'>
        <div className='anyQuery'>
            <h1>Ask Us Anything</h1>
            <p>Have questions or need support? Use our query section to get answers and assistance tailored to your needs. We're here to help with any inquiries or concerns you may have.</p>
        </div>
    <div className='queryform'>
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <br></br>
      <input type="text" name="user_name" placeholder='Name'/>
      <br></br>
      <label>Email</label>
      <br></br>
      <input type="email" name="user_email" placeholder='Email' />
      <br></br>
      <label>Message</label>
      <br></br>
      <textarea name="message" />
      <br></br>
      <input type="submit" value="Send" className='submit-btn'/>
      <ToastContainer />
    </form>
    </div>
    </div>
    </>
  )
}

export default Query
