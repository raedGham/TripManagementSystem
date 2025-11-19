import RatingFeedback from "../../components/RatingFeedback/RatingFeedback";

function Feedback() {
  const handleReview = (data) => {
    console.log("Rating:", data.rating);
    console.log("Feedback:", data.feedback);

    // Here you can send it to your backend
    // axios.post("/api/reviews", data)
  };

  return (
    <div className="flex justify-center mt-10">
      <RatingFeedback onSubmit={handleReview} />
    </div>
  );
}
export default Feedback;
