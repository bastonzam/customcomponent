import React, { useState ,useRef} from "react";

const width = 500;
const height = 300;
const borderStyle = "2px dashed #f37204";

const dropAreaImageStyle = {
  width,
  height,
};

const dropAreaStyle = {
  ...dropAreaImageStyle,
  border: borderStyle,
};

const DropArea = () => {
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  const refInput = useRef(null);

  const onDrop = (e) => {
    console.log(e)
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    console.log("Files: ", files);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }

    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];

    setData(false);

    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }

    if (size / 1024 / 1024 > 5) {
      setErr("File size exceeded the limit of 5MB");
      return false;
    }

    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  };

  const onInputFile = (e) => {
    console.log(e)
let files = e
    console.log("Files: ", files);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }

    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const { size, type } = files[0];

    setData(false);

    if (!fileTypes.includes(type)) {
      setErr("File format must be either png or jpg");
      return false;
    }

    if (size / 1024 / 1024 > 5) {
      setErr("File size exceeded the limit of 5MB");
      return false;
    }

    setErr(false);

    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target.result);
    };
  }
  const dropClick = () => {
    refInput.current.click();
  };

  const onDragStart = (e) => {
    e.preventDefault();
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {err && <p>{err}</p>}
      <div
        style={dropAreaStyle}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
        onClick={(e) => dropClick(e)}
      >
        {data && <img style={dropAreaImageStyle} src={data} />}
      </div>
      <div>
        <input ref={refInput} type="file" onChange={(e) => onInputFile(e.target.files)} hidden/>
      </div>
    </div>
  );
};
export default DropArea;
