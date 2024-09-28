import { Center, Box, Title, Image, Button, Flex } from "@mantine/core";
import new_make_logo from "../assets/new_make_logo_updated.png";
import notebook from "../assets/notebook.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const spinAnimation = {
    animation: "spin 10s linear infinite",
  };
  const navigate = useNavigate();
  const [btnOpacity, setbtnOpacity] = useState(0)
  const [animation, setAnimation] = useState({
    opacity: 0,
    width: "200px",
    position: "absolute",
    left: "-50px", // Initially off-screen to the left
    transition: "opacity 2s, left 2s", // Transition for smooth animation
  });

  return (
    <Center bg="#fefae0" w={"100vw"} h={"300vh"} className="hide-scroll-bar">
      <section
        style={{
          position: "absolute",
          display: "flex",
          height:"300vh",
          width:"100vw",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow:"hidden",
        }}
      >
        <Flex direction="row" align="center" justify="center" w={"100%"} h={"40%"} pt="lg" pb="lg">
          {/* Text and Button in a column */}
          <Box display="flex" flexDirection="column" alignItems="flex-start" mr="xl">
          
            <Title
              order={1}
              size={48}
              style={{ lineHeight: "1.2", marginBottom: "1em" }} 
            >
              Feel heard at <i>Anytime</i>,<i> Anywhere</i>, <i>Anyplace</i>
              <br />
            </Title>

           
          </Box>

          <Image
            src={new_make_logo} 
            alt="Logo"
            width={160} // Adjust the width as needed
            style={spinAnimation} // Apply spin animation

          />
        </Flex>

        {/* Flex Container for Title and Paragraph */}
        <Flex direction="column" align="center" justify="center" p="15vh 5vh" h={"30%"} w={"100%"} bg={"#fff"}>
          <Title order={2} size={32} style={{ marginBottom: "1em", textAlign: "center" }}>
            Discover the power of Daily Jounaling
          </Title>
          <p style={{ textAlign: "center", fontSize: "18px", color: "#333" }}>
          Daily journaling is a powerful practice that provides a safe space for emotional release and self-reflection. By putting pen to paper, we can untangle complex feelings, clarify our thoughts, and gain insights into our experiences. With JustVent, you can enhance this experience even further; the app uses AI to analyze your entries, providing insights into your emotional patterns and helping you track your growth over time.</p>
        </Flex>
       
        <Flex direction="row-reverse" align="center" justify="space-between" p="3em" h="40%" w={"100%"} onMouseOver={
          () => {setAnimation({ ...animation, opacity: 1, left: "180px", width: "350px" });
           setbtnOpacity(1);
          }}>
          {/* Text and Button in a column */}
          
          {/* Image with fade animation in intro */}
          <Image
            src={notebook} // Use your imported image
            alt="Notebook"
            style={animation}
          />

          <Box display="flex" w={"50%"} flexDirection="column"  alignItems="center" m="xl" p="1em">
            {/* Tagline */}

              <button style={{width:"100%", fontSize:"20px", backgroundColor:"#ccd5ae", opacity: btnOpacity, height: "5em", transition:"opacity 2s"}} 
              id={"btn-signin"}
              onClick={() => navigate("/journal")}
              >
                Start writing now
              </button>
              <br />

           
          </Box>

          
        </Flex>
      </section>

      {/* Define the keyframes for the spin animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          #btn-signin:hover {
            border:3px solid #000000;
            cursor: pointer;
          }
        `}
      </style>
    </Center>
  );
}

export default Home;
