// export default SendEmailsPage;
import React, { useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { server } from "../server";

const SendEmailsPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmails = async () => {
    setLoading(true);
    try {
      await axios.post(`${server}/subscribe/send-emails`, { subject, message });
      alert("Emails sent successfully.");
    } catch (error) {
      alert("An error occurred while sending emails.");
    }
    setLoading(false);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-3xl font-bold mb-4">Send Emails to Subscribers</h1>
      <div className="mb-4">
        <input
          type="text"
          className="rounded-l px-4 py-2 focus:outline-none border border-gray-300"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Use ReactQuill instead of textarea */}
        <ReactQuill
          value={message}
          onChange={setMessage}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Enter message"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
        onClick={handleSendEmails}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Emails"}
      </button>
    </div>
  );
};

export default SendEmailsPage;
