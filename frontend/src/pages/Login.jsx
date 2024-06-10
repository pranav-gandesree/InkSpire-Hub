import { useState } from "react";
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
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate=useNavigate()

  const handleLogin = async(event)=>{
    event.preventDefault();
    try{
      const res = await axios.post("http://localhost:1111/api/auth/login",{email,password})
      console.log(res)
      console.log("login succesfulll")
      navigate("/")

    }catch(err){
      setError(true)
      console.log(err);
    }
  }

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>

    <div className='flex items-center justify-between h-[10vh] bg-[#E2E8F0]'>
        <h1 className='text-xl'><Link to='/'>Medium Clone</Link></h1>
        <h3 className="mr-10"><Link to='/register'> register</Link></h3>
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
        <Heading color="teal.400">Welcome</Heading>
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
                  <Input type="email" placeholder="email address" onChange={(e)=>setEmail(e.target.value)}/>
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
                    onChange={(e)=>setPassword(e.target.value)}
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
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
      <Box>
        New to us?{" "}
        <Link color="teal.500" to='/register'>
          Sign Up
        </Link>
      </Box>
    </Flex>
    </>
  );
};

export default Login;
