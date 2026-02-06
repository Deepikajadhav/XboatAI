 const RatingModal = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      {[1,2,3,4,5].map(n => (
        <span key={n} onClick={() => setRating(n)}>⭐</span>
      ))}

      <textarea
        placeholder="Your feedback"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={() => onSubmit(rating, text)}>
        Submit Feedback
      </button>
    </div>
  );
};
