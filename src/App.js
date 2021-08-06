import React, { useState } from "react";
import axios from "axios";
import "./App.css";
let copyFetchData = [];
const App = () => {
  const reference = React.useRef();
  const [fetchedData, setFetchedData] = React.useState([]);
  const [onPressItem, setOnPressItem] = useState(-1);
  const [error, setError] = React.useState("");
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const { data = [] } = response || {};
      if (Array.isArray(data)) {
        setFetchedData(data);
        copyFetchData = data;
        // setExtraData(data);
      }
    } catch (err) {
      setError("Error in fetching data");
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  const filterData = () => {
    setFetchedData(
      copyFetchData.filter((item) => {
        let value = reference.current && reference.current.value;
        return (
          item.name
            ?.toLowerCase()
            ?.includes(value ? value.toLowerCase() : "") ||
          item.email?.toLowerCase()?.includes(value ? value.toLowerCase() : "")
        );
      })
    );
  };

  return (
    <div className="main">
      <Header headerTitile="User list" />
      <div className="container">
        <input
          ref={reference}
          onChange={filterData}
          className="inputField"
          placeholder="Search by name or email"
        />
        <div className="search-list">
          {Array.isArray(fetchedData) && fetchedData.length ? (
            fetchedData.map((item, index) => {
              const {
                name = "",
                username = "",
                email = "",
                phone = "",
                website = "",
              } = item || {};
              return (
                <div key={index} className="search-card">
                  <div>
                    <p style={{ color: "gray", marginRight: 10, opacity: 0.3 }}>
                      {index + 1}{" "}
                    </p>
                    <p
                      className="search-item"
                      onClick={() =>
                        setOnPressItem(onPressItem == index ? -1 : index)
                      }
                    >
                      {name}
                      <span className="username">{` @${username}`}</span>
                    </p>
                  </div>
                  {onPressItem == index && (
                    <div className="detail-card">
                      <p>
                        EMAIL: <span>{email}</span>
                      </p>
                      <p>
                        PHONE: <span>{phone}</span>
                      </p>
                      <p>
                        WEBSITE: <span>{website}</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="error">{error || "No Data Found"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Header = ({ headerTitile }) => {
  return (
    <div
      style={{
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <h1>{headerTitile}</h1>
    </div>
  );
};

export default App;
