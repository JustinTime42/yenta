import React, { useState } from "react";
import { handleLogin, handleSignup } from "../../services/auth";
import {
  Card,
  TextInput,
  Button,
  Snackbar,
  HelperText,
} from "react-native-paper";
import { SafeArea } from "../../components/utility/SafeArea";
import { PrimaryButton, SecondaryButton } from "../../components/buttons";
import styled from "styled-components";
import { View } from "react-native";
import { updateUser } from "../../services/firestore";

const ButtonView = styled(View)`
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Centered = styled(Card)`
  width: 80%;
  margin-right: auto;
  margin-left: auto;
`;

const LoginForm = (props) => {
  return <Centered>{props.children}</Centered>;
};

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loginError, setLoginError] = useState("");

  const signUpUser = async () => {
    if (password === password2) {
      const credential = await handleSignup(email.trim(), password);
      console.log(credential);
      updateUser({ uid: credential.user.uid });
      //await setDoc(doc(db, "users", credential.user.uid), {});
    } else {
      setLoginError("Passwords must match.");
    }
  };

  const logInUser = () => {
    handleLogin(email.trim(), password)
      .then((user) => {
        return;
      })
      .catch((error) => {
        setLoginError(error);
      });
  };

  const isPasswordValid = password.length < 9 ? false : true;

  return (
    <SafeArea>
      <LoginForm>
        <TextInput value={email} onChangeText={setEmail} placeholder="email" />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="password"
        />
        <HelperText type="error" visible={!isPasswordValid && isNewUser}>
          Password must be at least 9 characters
        </HelperText>
        {isNewUser && (
          <>
            <TextInput
              value={password2}
              onChangeText={setPassword2}
              secureTextEntry
              placeholder="retype password"
            />
            <Button mode="contained" onPress={signUpUser}>
              Sign Up
            </Button>
          </>
        )}
        {!isNewUser && (
          <ButtonView>
            <PrimaryButton onPress={logInUser}>Log In</PrimaryButton>
            <SecondaryButton onPress={() => setIsNewUser(true)}>
              Register
            </SecondaryButton>
          </ButtonView>
        )}
      </LoginForm>
      <Snackbar visible={loginError} onDismiss={() => setLoginError(false)}>
        {loginError}
      </Snackbar>
    </SafeArea>
  );
};

export default Login;
