const theme = {};

//cores do tema
theme.palette = {
    white: "#FFF",
    black: "#000",
    light: "#ecf0f1",
    success: "#28a745",
    danger: "#dc3545",
    primary: "#007bff",
    secondary: "#6c757d",
    warning: "#ffc107",
    grayscale: ["#bdc3c7","#7f8c8d","#95a5a6"],
    primaryButton: {
        default: { bg: '#007bff', border: '#007bff' },
        hover: { bg: '#0069d9', border: '#0062cc' },
        click: { bg: '#0062cc', border: '#005cbf'}
    },
    secondaryButton: {
        default: { bg: '#6c757d', border: '#6c757d' },
        hover: { bg: '#5a6268', border: '#545b62' },
        click: { bg: '#545b62', border: '#4e555b' }
    },
    successButton: {
        default: { bg: '#28a745', border: '#28a745' },
        hover: { bg: '#218838', border: '#1e7e34' },
        click: { bg: '#1e7e34', border: '#1c7430' }
    },
    dangerButton: {
        default: { bg: '#dc3545', border: '#dc3545' },
        hover: { bg: '#c82333', border: '#bd2130' },
        click: { bg: '#bd2130', border: '#b21f2d' }
    }
};

//tamanhos de fonte
theme.sizes = {
    xsmall: '10px',
    small: '12px',
    regular: '14px',
    big: '18px'
};

//tamanhos de padding/margin
theme.spacing = {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 32,
    xlarge: 64,
};

//fonte
theme.font = "Segoe UI, Helvetica, Arial, sans-serif";

export default theme;