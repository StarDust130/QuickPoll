/* eslint-disable @typescript-eslint/no-explicit-any */
const page = async () => {
  // Fetch the polls data from your Express API
  const pollResponse = await fetch("http://localhost:3000/api/v1/poll");
  const pollData = await pollResponse.json();

  // Check if pollData is an array
  if (!Array.isArray(pollData)) {
    return <p>No polls found</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Polls</h1>

      {/* Map through each poll and display it */}
      {pollData.map((poll, pollIndex) => {
        const { question, options, voted, createdBy, createdAt, updatedAt } =
          poll;

        return (
          <div
            key={pollIndex}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            {/* Render the poll question */}
            <h2 className="text-2xl font-semibold mb-4">{question}</h2>

            {/* Render the poll options */}
            <h3 className="text-xl font-medium mb-2">Options:</h3>
            <ul className="list-disc pl-6">
              {options?.map((option: any, optionIndex: any) => (
                <li key={optionIndex} className="mb-2">
                  {option}
                </li>
              ))}
            </ul>

            {/* Render other details */}
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Created By:</span> {createdBy}
              </p>
              <p>
                <span className="font-semibold">Votes:</span> {voted?.length}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Updated At:</span>{" "}
                {new Date(updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
