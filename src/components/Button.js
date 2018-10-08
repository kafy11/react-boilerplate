import styled from 'styled-components';

const styleButton = ({ type, theme, round }) => {
    const palette = theme.palette[type + 'Button'];

    return `
        background-color: ${palette.default.bg};
        color: #FFF;
        cursor: pointer;
        font-weight: 400;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid ${palette.default.border};
        border-radius: ${round ? '50%' : '0.25rem'};
        height: 38px;
        min-width: 38px;

        :hover{
            background-color: ${palette.hover.bg};
            border-color: ${palette.hover.border};
        }

        :active{
            background-color: ${palette.click.bg};
            border-color: ${palette.click.border};
        }
    `
}

export default styled.button`
    ${styleButton}
`;