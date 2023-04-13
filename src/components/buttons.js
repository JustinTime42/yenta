import React, { useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { useTheme } from "react-native-paper";

// const StyledPrimary = styled(Button)`
//   margin: 1px;
//   background-color: ${(props) => props.theme.colors.button.primary};
//   color: ${(props) => props.theme.colors.button.secondary};
// `;

// const StyledSecondary = styled(Button)`
//   margin: 1px;
//   color: ${(props) => props.theme.colors.button.secondary};
// `;

const ButtonView = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const PrimaryButton = (props) => {
  const theme = useTheme();
  return (
    <ButtonView>
      <Button onPress={props.onPress} textColor={theme.colors.primary}>
        {props.children}
      </Button>
    </ButtonView>
  );
};

export const SecondaryButton = (props) => {
  const theme = useTheme();
  return (
    <ButtonView>
      <Button onPress={props.onPress} textColor={theme.colors.secondary}>
        {props.children}
      </Button>
    </ButtonView>
  );
};
