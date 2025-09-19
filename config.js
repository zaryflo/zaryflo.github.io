/**
 * Configuration file for Zaryflo AJO Personalization Demo
 * 
 * Replace the placeholder values with your actual Adobe Experience Platform configuration
 */

const CONFIG = {
  // Adobe Experience Platform Configuration
  edgeDomain: "edge.adobedc.net",
  edgeConfigId: "652c0dd5-96c2-46c8-a895-445912c55c57", // Replace with your Edge Config ID
  orgId: "53A16ACB5CC1D3760A495C99@AdobeOrg", // Replace with your Organization ID
  
  // Debug settings
  debugEnabled: true, // Set to false in production
  thirdPartyCookiesEnabled: false,
  
  // Personalization settings
  surfaceName: "demo-surface",
  
  // Demo settings
  enableDemoMode: true, // Set to false when using real AJO campaigns
  
  // Demo content (used when Alloy is not configured or no personalization is available)
  demoContent: {
    heroImageName: "demo-hero.svg",
    heroTitle: "Welcome to Personalized Zaryflo!",
    heroDescription: "This content has been personalized just for you using Adobe Journey Optimizer.",
    buttonActions: [
      { 
        id: 1, 
        text: "Explore Features", 
        content: "Let's explore what we can do together!" 
      },
      { 
        id: 2, 
        text: "Start Journey", 
        content: "Your personalized journey begins now!" 
      },
      { 
        id: 3, 
        text: "Learn More", 
        content: "Discover more about our personalization capabilities." 
      }
    ]
  }
};

// Make config available globally
window.CONFIG = CONFIG;
