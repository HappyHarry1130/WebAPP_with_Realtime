import React from 'react';

function Results() {
  return (
    <div>
      <h1>Generated Video</h1>
      <video controls>
        <source src="path_to_generated_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Results;