import { Menu, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const axiosClient = axios.create({
    baseURL:
      "http://justvent-app-lb-2099772870.us-east-2.elb.amazonaws.com/api/v1/",
    timeout: 15000,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
  const userId = "user_001";

  const fetchJournals = async () => {
    const result = await axiosClient.get(
      `embeddings/get_related?text=${searchTerm}&user_id=${userId}`
    );
    setSearchResults(result.data);
    console.log(result.data);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      fetchJournals();
    }
  };

  return (
    <>
      <Menu>
        <Menu.Target>
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<FaSearch size={20} onClick={fetchJournals} />}
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Menu.Target>
        <Menu.Dropdown>
          {searchResults.map((result) => (
            <Menu.Item key={result.id}>{result.title}</Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default Searchbar;
