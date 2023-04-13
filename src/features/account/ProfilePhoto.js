import React, { useContext, useState, useEffect } from "react";
import { Avatar, ActivityIndicator } from "react-native-paper";
import styled from "styled-components";
import { LoadingContext } from "../../contexts/loading.context";

const ProfilePhoto = ({ src }) => {
  const { setIsLoading, isLoading } = useContext(LoadingContext)

  const ImageFrame = styled.View`
    width: 128px;
    margin-right: auto;
    margin-left: auto;
    height: 128px;
  `;

  const Photo = styled(Avatar.Image)`
    height: 128px;
    width: 128px;
  `;

  useEffect(() => {
    console.log("setting loading state: ", src);
  }, [src]);

  return (
    <ImageFrame>
      <Photo
        size={128}
        source={{ uri: src }}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onError={() => console.log("Error")}
      />
    </ImageFrame>
  );
};

export default ProfilePhoto;
