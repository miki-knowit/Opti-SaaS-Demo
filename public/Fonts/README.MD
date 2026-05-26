Fonter importas och hostas lokalt.

Font-weight definieras genom att importera flera skärningar av samma font och definiera dem med @font-face.
I koden för varje skärning anges då font-weight och font-style likt följande:

@font-face {
font-family: "Open Sans";
src: url("/fonts/OpenSans/OpenSans-Regular.ttf") format("truetype");
font-weight: 400;
font-style: normal;
font-display: swap;
}

Exempel på användning finns i styleguide på &**heading och &**description.
