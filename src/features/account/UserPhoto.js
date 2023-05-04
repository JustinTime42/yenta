import React, { useContext, useState, useEffect } from "react";
import { Avatar, ActivityIndicator } from "react-native-paper";
import styled from "styled-components";
import { LoadingContext } from "../../contexts/loading.context";
import { StyleSheet } from "react-native";

const UserPhoto = ({ src }) => {
  const { setIsLoading, isLoading } = useContext(LoadingContext)

  const Photo = styled(Avatar.Image)`
    height: 128px;
    width: 128px;
  `;

  return (
    <Avatar.Image
      style={styles.imageContainer}
      size={128}
      source={src ? { uri: src } : require("../../../assets/favicon.png")}
    />
  );
};

export default UserPhoto;

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: "auto",
    marginLeft: "auto",
  },
});
