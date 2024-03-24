import ProgressBar from "react-bootstrap/ProgressBar";

function LodingBar() {
  //   return <ProgressBar animated now={45} />;

  //   const now = 60;
  //   //   return <ProgressBar now={now} label={`${now}%`} />;
  //   return <ProgressBar now={now} label={`${now}%`} />;

  //   const now = 60;
  const now = 100;
  return (
    <ProgressBar
      animated
      now={now}
      label="Loading..."
      //   label={`${now}%`}
      className="lodingtxtSX"
    />
  );
}

export default LodingBar;
