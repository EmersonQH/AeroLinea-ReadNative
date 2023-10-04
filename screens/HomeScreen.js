import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  InnerContainer,
  WelcomeContainer,
  Line,
} from './../components/styles';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = () => {
  // credentials context
  const { storedCredentials} = useContext(CredentialsContext);

  const { photoUrl } = storedCredentials;

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require('../img/logotipo.png');

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('../img/ImgPrincipal.jpg')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! United</PageTitle>
          <SubTitle welcome={true}>{'Viaja con mas'}</SubTitle>
          <SubTitle welcome={true}>{'espacio y confort'}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
            
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;