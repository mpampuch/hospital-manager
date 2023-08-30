import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

const StyledParagraph = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  margin: 0;
`;

function Copyright() {
  // Get the current year
  const year = new Date().getFullYear();

  return (
    <StyledContainer>
      <StyledParagraph>© {year} Mark Pampuch</StyledParagraph>
      <StyledParagraph>For demonstration purposes only</StyledParagraph>
    </StyledContainer>
  );
}

export default Copyright;
