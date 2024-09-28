import React, { useState } from 'react';
import { Container, Textarea, TextInput, Button, Card, Title, Stack, Center } from '@mantine/core';
import new_make_logo from "../assets/new_make_logo_updated.png"; 

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <Center w={"199vh"} h={"110vh"} bg={"#f1f3e1"}>
    <Container size="md" maxh={"70vh"} style={{marginTop: '20px', paddingTop: '5em'}}>
     
      <Card shadow="sm" padding="lg" mb="lg" bg={'#E9EDC9'}>
        <Title order={2} align="center" mb="xl">
            Sign in or create your account
        </Title>
        <div>
       
          <img src={new_make_logo} alt="JustVent Logo" className='wrap' style={{width : '300px',height : '120px'}}/>
        </div>

        <form onSubmit={handleSubmit}>
      <div>
        <label>Email : </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password : </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign In</button>
    </form>
            </Card>
    </Container>
    </Center>
  );
};

export default Signin;
