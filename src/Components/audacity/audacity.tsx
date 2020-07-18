import React from "react";
import {
  Container,
  TopBarContainer,
  TitleContainer,
  CollaboratorsContainer,
  ProfilePicture,
  MasterContainer,
  AudioContainer,
  MasterButtonsContainer,
  PlaybackButton,
  MainContentContainer,
  ChatContainer,
  BranchContainer,
  InnerBranchesContainer,
  ButtonsContainer,
  Button,
  Track,
  Empty,
} from "./audacity.styled";
import { MasterCleff } from "../masterCleff/masterCleff";

interface AudacityProps {
  importTrack: () => void;
  generateTrack: () => void;
  manualTrack: () => void;
  tracks: string[];
  removeTrack: (index: number) => void;
}

export function Audacity({
  importTrack,
  generateTrack,
  manualTrack,
  tracks,
  removeTrack,
}: AudacityProps) {
  return (
    <Container>
      <TopBarContainer>
        <TitleContainer>Track 1</TitleContainer>
        <CollaboratorsContainer>
          Collaborators:
          <ProfilePicture />
          <ProfilePicture />
          <ProfilePicture>+</ProfilePicture>
        </CollaboratorsContainer>
      </TopBarContainer>
      <MasterContainer>
        Master:
        <MasterCleff
          abcNotation="K:C\n|: cccc|cccc|cccc|cccc :|"
          parserParams={{}}
          engraverParams={{ responsive: "resize" }}
          renderParams={{ viewportHorizontal: true }}
        />
        <MasterButtonsContainer>
          <PlaybackButton>▶</PlaybackButton>
          <PlaybackButton>⏸</PlaybackButton>
          <PlaybackButton>⏹</PlaybackButton>
        </MasterButtonsContainer>
      </MasterContainer>
      <MainContentContainer>
        {/* <ChatContainer>
          Chat:
          <textarea />
        </ChatContainer> */}
        <BranchContainer>
          Tracks:
          <InnerBranchesContainer>
            {tracks.length === 0
              ? `No tracks`
              : tracks.map((track, index) => (
                  <Track key={index}>
                    {track}
                    <button onClick={() => removeTrack(index)}>X</button>
                  </Track>
                ))}
          </InnerBranchesContainer>
          <ButtonsContainer>
            <Button onClick={importTrack}>Import Track</Button>
            <Button onClick={generateTrack}>Generate Track</Button>
            <Button onClick={manualTrack}>Manual Track</Button>
          </ButtonsContainer>
        </BranchContainer>
      </MainContentContainer>
    </Container>
  );
}
