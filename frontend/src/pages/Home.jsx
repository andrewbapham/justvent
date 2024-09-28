import { Center, Box, Title, Image, Button, Flex } from "@mantine/core";
import new_make_logo from "../assets/new_make_logo_updated.png"; 

function Home() {
  const spinAnimation = {
    animation: "spin 10s linear infinite",
  };

  return (
    <Center bg="#fefae0" w={"100vw"} h={"100vh"} className="hide-scroll-bar">
      <section
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "2em",
        }}
      >
        <Flex direction="row" align="center" justify="center" p="lg">
         
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
            width={160} 
            style={spinAnimation} 
          />
        </Flex>
      </section>

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
