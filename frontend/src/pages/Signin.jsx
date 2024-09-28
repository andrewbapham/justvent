import React, { useState } from 'react';
import { Container, Textarea, TextInput, Button, Card, Title, Stack, Center } from '@mantine/core';
import new_make_logo from "../assets/new_make_logo_updated.png";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <Center w={"199vh"} h={"110vh"} bg={"#f1f3e1"}>
      <Container align="center" size="md" style={{ marginTop: '20px', paddingTop: '5em' }}>
        <Card shadow="sm" padding="lg" mb="lg" bg={'#E9EDC9'}>
          <Title order={2} align="center">
            Sign in or create your account
          </Title>
          <div>
            <img src={new_make_logo} alt="JustVent Logo" className='wrap' style={{ width: '200px', height: '160px', overflow: 'hidden', margin: "10px" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', fontSize: '16px' }}>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '7px 20px',
                  border: '1px solid #ccd5ae',
                  backgroundColor: '#f1f3e1',
                  outline: 'none',
                  width: '60%',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ marginRight: '10px', fontSize: '16px' }}>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '7px 20px',
                  border: '1px solid #ccd5ae',
                  backgroundColor: '#f1f3e1',
                  outline: 'none',
                  width: '60%',
                }}
              />
            </div>

            <Button 
              type="submit"
              id='.submit-button'
              onClick={() => handleSubmit(e.target.value)}
              style={{
                padding: '5px 30px',
                backgroundColor: '#7e8f43',
                border: '1px solid #ccd5ae',
                width: '60%',
                alignSelf: 'center',
                marginTop: '10px',
                cursor: 'pointer',
              
              }}
            >
              Sign In
            </Button>
              
              {/* Text to create an account */}
            <p className="create-account" onClick={() => {alert("Coming on future updates")}} style={{ marginTop: '15px', cursor: 'pointer' }}>
              Create an account
            </p>

          </form>
        </Card>
      </Container>
      <style>{".wrap{object-fit: none;} .create-account {color: #7e8f43;text-align: center;font-size: 16px;} .create-account:hover {color: #bac985;text-decoration: underline;.hide-scroll-bar {overflow-x: hidden;}"}</style>
    </Center>
  );
};

export default Signin;
