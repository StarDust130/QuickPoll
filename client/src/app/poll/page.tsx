const page = async () => {
  const pollResponse = await fetch(
    "http://localhost:3000/api/v1/poll/670221f9119a6b8f0c6d8976"
  );
  const pollData = await pollResponse.json();

  console.log(pollData);

  // Destructure the poll object for easier access to properties
  const { question, options, voted, createdBy, createdAt, updatedAt } =
    pollData;

  return (
    <div>
      {/* Render the poll question */}
      <h1>{question}</h1>

      {/* Render the poll options */}
      <h2>Options:</h2>
      <ul>
        {options.map((option: string, index: number) => (
          <li key={index}>{option}</li>
        ))}
      </ul>

      {/* Render other details */}
      <p>Created By: {createdBy}</p>
      <p>Votes: {voted.length}</p>
      <p>Created At: {new Date(createdAt).toLocaleString()}</p>
      <p>Updated At: {new Date(updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default page;
