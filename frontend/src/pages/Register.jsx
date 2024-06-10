import { useState} from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  // FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaLessThanEqual } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate=useNavigate()

  const handleRegister = async(event) =>{
    event.preventDefault();

     try{
      const res = await axios.post("http://localhost:1111/api/auth/register", {username,email,password})
       console.log(res.data);
       setUsername(res.data.username);
       setEmail(res.data.email);
       setPassword(res.data.password)
       setError(false)
       navigate("/login")

     }catch(e){
       setError(true)
        console.log(e);
     }
  }


  const handleShowClick = () => setShowPassword(!showPassword);

  return (

    <>

    <div className='flex items-center justify-between h-[10vh] bg-[#E2E8F0]'>
        <h1 className='text-xl'><Link to='/'>Medium Clone</Link></h1>
        <h3 className="mr-10"><Link to='/login'> login</Link></h3>
    </div>

    <Flex
      flexDirection="column"
      width="100wh"
      height="90vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    //   marginLeft="40px"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Register</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="enter username"   
                        onChange={(e)=>{setUsername(e.target.value)}}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" 
                         onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleRegister}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
       {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
      <Box>
        already have an account?{" "}
        <Link color="teal.500" to='/login'>
          Log In
        </Link>
      </Box>
    </Flex>

</>
  );
};

export default Register;
