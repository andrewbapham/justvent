import { Center, Box, Title, Image } from "@mantine/core";
import new_make_logo from "../assets/new_make_logo_updated.png"; // Import the local image
import Notebook from "../assets/notebook.png";

function Home() {
  const spinAnimation = {
    animation: "spin 10s linear infinite", // Spins every 5 seconds infinitely
  };

  return (
    <Center bg="#fefae0" w={"100vw"} h={"180vh"} className="hide-scroll-bar">
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box p="lg" display="flex" alignItems="center">
          {/* Tagline on the left */}
          <Title
            order={1}
            mr="xl"
            size={48}
            style={{ lineHeight: "1.2", marginTop: "4em" }}
          >
            Feel heard at <i>Anytime</i>,<i> Anywhere</i>, <i>Anyplace</i>
            <br></br>
          </Title>

          {/* Image on the right with spin animation */}
          <Image
            src={new_make_logo} // Use your imported image
            alt="Your Image Description"
            w={"100%"} // Adjust the width as needed
            h={"100%"}
            style={spinAnimation} // Apply spin animation
          />
        </Box>
        <Box>
          <img src={Notebook}></img>
        </Box>
      </section>

      {/* Define the keyframes for the spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Center>
  );
}

export default Home;
