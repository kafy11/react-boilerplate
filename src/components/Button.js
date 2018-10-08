import styled from 'styled-components';

const styleColors = ({ type = 'primary', theme, link }) => {
    if(!link){
        const palette = theme.palette[type + 'Button'];

        return `
            background-color: ${palette.default.bg};
            border: 1px solid ${palette.default.border};

            :hover{
                background-color: ${palette.hover.bg};
                border-color: ${palette.hover.border};
            }

            :active{
                background-color: ${palette.click.bg};
                border-color: ${palette.click.border};
            }
        `
    } else {
        return `
            background-color: transparent;
            border: 0;
        `;
    }
}

export default styled.button`
    color: #FFF;
    cursor: pointer;
    font-weight: 400;
    white-space: nowrap;
    vertical-align: middle;
    border-radius: ${({ round }) => round ? '50%' : '0.25rem'};
    height: 38px;
    min-width: 38px;
    ${styleColors}
`;