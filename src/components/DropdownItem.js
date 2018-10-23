import styled from 'styled-components';

export default styled.li`
    padding: ${({ theme }) => `${theme.spacing.small}px ${theme.spacing.medium}px`};
    cursor: pointer;
`;