import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            50: "#E9D8FD",
            100: "#D6BCFA",
            500: "#805AD5", // Violet for primary actions
            600: "#6B46C1",
        },
        glass: {
            100: "rgba(255, 255, 255, 0.25)",
            200: "rgba(255, 255, 255, 0.45)",
            300: "rgba(255, 255, 255, 0.1)", // Darker glass
        }
    },
    fonts: {
        heading: `'Work Sans', sans-serif`,
        body: `'Work Sans', sans-serif`,
    },
    styles: {
        global: {
            body: {
                bgImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Clean, premium subtle gradient
                // Alternative vibrant: "linear-gradient(to right, #8e2de2, #4a00e0)" (Violet)
                bgAttachment: "fixed",
                color: "gray.800",
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: "12px", // Rounded modern look
            },
        },
        Input: {
            variants: {
                filled: {
                    field: {
                        borderRadius: "12px",
                        bg: "whiteAlpha.700",
                        _focus: {
                            bg: "white",
                        }
                    }
                }
            }
        }
    },
});

export default theme;
