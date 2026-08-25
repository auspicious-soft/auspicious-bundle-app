import { useEffect, useState } from "react";
import { Popover, TextField, Icon } from "@shopify/polaris";
import {
    ChevronDownIcon,
    ChevronUpIcon,
} from "@shopify/polaris-icons";



// --------------------------------------------------
// HEX -> HSB
// --------------------------------------------------
const hexToHsb = (hex) => {
    hex = hex.replace("#", "");

    if (hex.length !== 6) {
        return {
            hue: 0,
            saturation: 0,
            brightness: 1,
        };
    }

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;

    if (delta !== 0) {
        if (max === r) {
            hue = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
            hue = 60 * ((b - r) / delta + 2);
        } else {
            hue = 60 * ((r - g) / delta + 4);
        }
    }

    if (hue < 0) {
        hue += 360;
    }

    const saturation = max === 0 ? 0 : delta / max;

    return {
        hue,
        saturation,
        brightness: max,
    };
};


// --------------------------------------------------
// HSB -> HEX
// --------------------------------------------------
const hsbToHex = ({ hue, saturation, brightness }) => {
    const h = hue / 60;
    const s = saturation;
    const v = brightness;

    const c = v * s;
    const x = c * (1 - Math.abs((h % 2) - 1));
    const m = v - c;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 1) {
        r = c;
        g = x;
    } else if (h >= 1 && h < 2) {
        r = x;
        g = c;
    } else if (h >= 2 && h < 3) {
        g = c;
        b = x;
    } else if (h >= 3 && h < 4) {
        g = x;
        b = c;
    } else if (h >= 4 && h < 5) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    const toHex = (value) =>
        Math.round((value + m) * 255)
            .toString(16)
            .padStart(2, "0");

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};


// --------------------------------------------------
// Color Picker Component
// --------------------------------------------------
export default function ColorPickerField({
    label,
    value = "#000000",
    transparency = 100,
    onChange,
    onTransparencyChange,
}) {
    const [active, setActive] = useState(false);

    const [hsb, setHsb] = useState(() =>
        hexToHsb(value)
    );

    const [alpha, setAlpha] = useState(transparency);


    // -----------------------------------------------
    // Update HSB when parent value changes
    // -----------------------------------------------
    useEffect(() => {
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            setHsb(hexToHsb(value));
        }
    }, [value]);


    // -----------------------------------------------
    // Update transparency
    // -----------------------------------------------
    useEffect(() => {
        setAlpha(transparency);
    }, [transparency]);


    // -----------------------------------------------
    // Change color
    // -----------------------------------------------
    const updateColor = (newHsb) => {
        setHsb(newHsb);

        const hex = hsbToHex(newHsb);

        onChange(hex);
    };


    // -----------------------------------------------
    // Color area mouse/touch
    // -----------------------------------------------
    const handleColorArea = (event) => {
        const rect =
            event.currentTarget.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width;

        const y =
            (event.clientY - rect.top) / rect.height;

        const saturation = Math.max(
            0,
            Math.min(1, x)
        );

        const brightness = Math.max(
            0,
            Math.min(1, 1 - y)
        );

        updateColor({
            ...hsb,
            saturation,
            brightness,
        });
    };


    // -----------------------------------------------
    // Hue change
    // -----------------------------------------------
    const handleHue = (event) => {
        const rect =
            event.currentTarget.getBoundingClientRect();

        const y =
            (event.clientY - rect.top) / rect.height;

        const hue = Math.max(
            0,
            Math.min(360, y * 360)
        );

        updateColor({
            ...hsb,
            hue,
        });
    };


    // -----------------------------------------------
    // Transparency change
    // -----------------------------------------------
    const handleTransparency = (event) => {
        const rect =
            event.currentTarget.getBoundingClientRect();

        const y =
            (event.clientY - rect.top) / rect.height;

        const newAlpha = Math.round(
            Math.max(
                0,
                Math.min(100, (1 - y) * 100)
            )
        );

        setAlpha(newAlpha);

        if (onTransparencyChange) {
            onTransparencyChange(newAlpha);
        }
    };


    // -----------------------------------------------
    // HEX input
    // -----------------------------------------------
    const handleHexChange = (newValue) => {
        if (
            /^#[0-9A-Fa-f]{6}$/.test(newValue)
        ) {
            setHsb(hexToHsb(newValue));
            onChange(newValue);
        } else {
            onChange(newValue);
        }
    };


    // -----------------------------------------------
    // Transparency input
    // -----------------------------------------------
    const handleAlphaInput = (newValue) => {
        let number = parseInt(newValue, 10);

        if (Number.isNaN(number)) {
            number = 0;
        }

        number = Math.max(
            0,
            Math.min(100, number)
        );

        setAlpha(number);

        if (onTransparencyChange) {
            onTransparencyChange(number);
        }
    };


    // -----------------------------------------------
    // Positions
    // -----------------------------------------------
    const huePosition =
        (hsb.hue / 360) * 100;

    const transparencyPosition =
        100 - alpha;


    return (
        <div>
            {/* Label */}
            <div
                style={{
                    marginBottom: "6px",
                }}
            >
                <span
                    style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        width: "50px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                    }}
                >
                    {label}
                </span>
            </div>


            {/* Color Button */}
            <Popover
                active={active}
                onClose={() => setActive(false)}
                activator={
                    <button
                        type="button"
                        onClick={() =>
                            setActive(
                                (prev) => !prev
                            )
                        }
                        style={{
                            width: "70px",
                            height: "30px",
                            padding: "4px 8px",
                            border:
                                "1px solid #c9cccf",
                            borderRadius: "6px",
                            background: "#fff",
                            cursor: "pointer",

                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                                "space-between",
                        }}
                    >
                        {/* Color Dot */}
                        <span
                            style={{
                                width: "18px",
                                height: "18px",
                                backgroundColor:
                                    value,
                                borderRadius:
                                    "50%",
                                display: "block",
                                border:"1px solid #0003",
                                
                            }}
                        />

                        {/* Arrow */}
                        <Icon
                            source={
                                active
                                    ? ChevronUpIcon
                                    : ChevronDownIcon
                            }
                        />
                    </button>
                }
            >

                {/* POPUP */}
                <div
                    style={{
                        width: "250px",
                        padding: "16px",
                    }}
                >

                    {/* --------------------------------
                        COLOR AREA + VERTICAL BARS
                    -------------------------------- */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                        }}
                    >

                        {/* COLOR AREA */}
                        <div
                            onClick={
                                handleColorArea
                            }
                            style={{
                                position:
                                    "relative",
                                width: "150px",
                                height: "150px",
                                cursor:
                                    "crosshair",

                                background: `
                                    linear-gradient(
                                        to top,
                                        #000,
                                        transparent
                                    ),
                                    linear-gradient(
                                        to right,
                                        #fff,
                                        hsl(
                                            ${hsb.hue},
                                            100%,
                                            50%
                                        )
                                    )
                                `,
                            }}
                        >

                            {/* Color Selector */}
                            <div
                                style={{
                                    position:
                                        "absolute",

                                    left: `${
                                        hsb.saturation *
                                        100
                                    }%`,

                                    top: `${
                                        (1 -
                                            hsb.brightness) *
                                        100
                                    }%`,

                                    width: "20px",
                                    height: "20px",

                                    borderRadius:
                                        "50%",

                                    border:
                                        "2px solid white",

                                    boxShadow:
                                        "0 0 2px rgba(0,0,0,.7)",

                                    transform:
                                        "translate(-50%, -50%)",

                                    pointerEvents:
                                        "none",
                                }}
                            />
                        </div>


                        {/* VERTICAL BARS */}
                        <div
                            style={{
                                display: "flex",
                                gap: "6px",
                                height: "150px",
                            }}
                        >

                            {/* HUE BAR */}
                            <div
                                onClick={handleHue}
                                style={{
                                    position:
                                        "relative",

                                    width: "20px",
                                    height:
                                        "150px",

                                    borderRadius:
                                        "7px",

                                    cursor:
                                        "pointer",

                                    background: `
                                        linear-gradient(
                                            to bottom,
                                            #ff0000,
                                            #ffff00,
                                            #00ff00,
                                            #00ffff,
                                            #0000ff,
                                            #ff00ff,
                                            #ff0000
                                        )
                                    `,
                                }}
                            >

                                <div
                                    style={{
                                        position:
                                            "absolute",

                                        left: "50%",

                                        top: `${huePosition}%`,

                                        transform:
                                            "translate(-50%, -50%)",

                                        width: "18px",
                                        height: "18px",

                                        borderRadius:
                                            "50%",

                                        background:
                                            "#fff",

                                        border:
                                            "1px solid #999",

                                        pointerEvents:
                                            "none",
                                    }}
                                />
                            </div>


                            {/* TRANSPARENCY BAR */}
                            <div
                                onClick={
                                    handleTransparency
                                }
                                style={{
                                    position:
                                        "relative",

                                    width: "20px",
                                    height:
                                        "150px",

                                    borderRadius:
                                        "7px",

                                    cursor:
                                        "pointer",

                                    backgroundColor:
                                        "#fff",

                                    backgroundImage: `
                                        linear-gradient(
                                            to bottom,
                                            ${value},
                                            transparent
                                        )
                                    `,
                                }}
                            >

                                <div
                                    style={{
                                        position:
                                            "absolute",

                                        left: "50%",

                                        top: `${transparencyPosition}%`,

                                        transform:
                                            "translate(-50%, -50%)",

                                        width: "18px",
                                        height: "18px",

                                        borderRadius:
                                            "50%",

                                        background:
                                            "#fff",

                                        border:
                                            "1px solid #999",

                                        pointerEvents:
                                            "none",
                                    }}
                                />
                            </div>

                        </div>
                    </div>


                    {/* --------------------------------
                        HEX + TRANSPARENCY
                    -------------------------------- */}
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "16px",
                        }}
                    >

                        {/* HEX */}
                        <div
                            style={{
                                flex: 1,
                            }}
                        >
                            <TextField
                                label="Color"
                                value={value}
                                onChange={
                                    handleHexChange
                                }
                                autoComplete="off"
                            />
                        </div>


                        {/* TRANSPARENCY */}
                        <div
                            style={{
                                width: "95px",
                            }}
                        >
                            <TextField
                                label="Transparency"
                                type="number"
                                value={String(
                                    alpha
                                )}
                                onChange={
                                    handleAlphaInput
                                }
                                suffix="%"
                                autoComplete="off"
                                min={0}
                                max={100}
                            />
                        </div>

                    </div>

                </div>

            </Popover>
        </div>
    );
}