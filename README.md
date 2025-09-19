# Zaryflo AJO Personalization Demo

This repository contains a demonstration of client-side personalization using Adobe Journey Optimizer (AJO) and the Adobe Experience Platform Web SDK (Alloy).

## Overview

This demo showcases how to implement client-side personalization using:
- **Adobe Experience Platform Web SDK** (Alloy) for data collection and personalization
- **Adobe Journey Optimizer** for creating personalized experiences
- **Client-side rendering** for dynamic content updates

## Features

- 🎯 **Real-time Personalization**: Content changes based on user profile and behavior
- 🖼️ **Dynamic Hero Content**: Personalized images, titles, and descriptions
- 🔘 **Interactive CTAs**: Personalized call-to-action buttons with tracking
- 📊 **Analytics Integration**: Automatic tracking of display and interaction events
- 🐛 **Debug Information**: Built-in debugging tools for development
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Option 1: Use as-is (Demo Mode)
1. Clone this repository
2. Open `index.html` in a web browser
3. The page will show demo content with a fallback when Alloy is not configured

### Option 2: Configure with Adobe Experience Platform

1. **Set up Adobe Experience Platform**:
   - Create a datastream in Adobe Experience Platform
   - Note your Edge Config ID and Organization ID

2. **Update Configuration**:
   - Open `index.html`
   - Replace the placeholder values in the Alloy configuration:
     ```javascript
     alloy("configure", {
       defaultConsent: "in",
       edgeDomain: "edge.adobedc.net",
       edgeConfigId: "YOUR_EDGE_CONFIG_ID", // Replace with your Edge Config ID
       orgId: "YOUR_ORG_ID@AdobeOrg", // Replace with your Org ID
       debugEnabled: true, // Set to false in production
       thirdPartyCookiesEnabled: false
     });
     ```

3. **Create AJO Campaigns**:
   - Set up campaigns in Adobe Journey Optimizer
   - Configure surfaces with the name `#sample-json-content`
   - Create personalized content for different user segments

## File Structure

```
zaryflo.github.io/
├── index.html          # Main HTML file with Alloy integration
├── script.js           # Personalization logic and event handling
├── style.css           # Styling and responsive design
├── img/                # Image assets
│   ├── default-hero.png
│   └── demo-hero.png
└── README.md           # This file
```

## How It Works

### 1. Alloy Configuration
The page loads the Adobe Experience Platform Web SDK and configures it with your datastream settings.

### 2. Personalization Request
When the page loads, it sends a `sendEvent` request to fetch personalized content:
```javascript
alloy("sendEvent", {
  "renderDecisions": true,
  personalization: {
    surfaces: ["#sample-json-content"]
  },
  "xdm": {
    "web": {
      "webPageDetails": {
        "name": "Zaryflo Personalization Demo",
        "URL": window.location.href
      }
    }
  }
});
```

### 3. Content Application
The `applyPersonalization` function processes the returned propositions and updates:
- Hero image (`img.ajo-decision`)
- Hero title (`#hero-title`)
- Hero description (`#hero-description`)
- Call-to-action buttons (`#action-button-*`)

### 4. Event Tracking
The implementation automatically tracks:
- **Display events**: When personalized content is shown
- **Interaction events**: When users click on personalized elements

## Personalization Data Format

The demo expects AJO campaigns to return content in this format:

```json
{
  "heroImageName": "personalized-image.png",
  "heroTitle": "Personalized Title",
  "heroDescription": "This content is personalized for you!",
  "buttonActions": [
    {
      "id": 1,
      "text": "Personalized Button",
      "content": "Thank you for clicking!"
    }
  ]
}
```

## AJO Campaign Setup

### 1. Create a Web Campaign
1. Go to Adobe Journey Optimizer
2. Create a new Web Campaign
3. Set the surface name to `#sample-json-content`

### 2. Configure Content
1. Use the Code Editor to create personalized content
2. Return JSON data matching the expected format
3. Set up different treatments for different user segments

### 3. Test the Campaign
1. Publish the campaign
2. Visit your website
3. Check the debug section for personalization status

## Debugging

The demo includes built-in debugging features:

- **Personalization Status**: Shows whether content was personalized
- **Debug Information**: Displays the raw proposition data
- **Console Logging**: Detailed logs in the browser console

## Customization

### Styling
Modify `style.css` to match your brand:
- Colors and gradients
- Typography
- Layout and spacing
- Responsive breakpoints

### Content Structure
Update `index.html` to change:
- Page layout
- Content sections
- Surface names
- HTML structure

### Personalization Logic
Modify `script.js` to:
- Handle different content types
- Add new personalization surfaces
- Implement custom tracking
- Add new interaction types

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **No personalization content appears**:
   - Check that your Edge Config ID and Org ID are correct
   - Verify that AJO campaigns are published and active
   - Check the browser console for errors

2. **Alloy not loading**:
   - Ensure you have an internet connection
   - Check that the Alloy CDN URL is accessible
   - Verify your datastream configuration

3. **Personalization not working**:
   - Check that the surface name matches your AJO campaign
   - Verify that your user profile meets campaign criteria
   - Check the debug information for proposition details

### Debug Mode

Enable debug mode by setting `debugEnabled: true` in the Alloy configuration. This will provide detailed logging in the browser console.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Resources

- [Adobe Experience Platform Web SDK Documentation](https://experienceleague.adobe.com/docs/experience-platform/edge/home.html)
- [Adobe Journey Optimizer Documentation](https://experienceleague.adobe.com/docs/journey-optimizer/using/ajo-home.html)
- [Alloy Samples Repository](https://github.com/adobe/alloy-samples)

## Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the Adobe Experience Platform documentation
3. Open an issue in this repository
