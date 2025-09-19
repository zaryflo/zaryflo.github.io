/*
Copyright 2024 Zaryflo. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Creates an identity payload for Adobe Experience Platform
 * @param {string} id - The identity value
 * @param {string} authenticatedState - The authentication state (ambiguous, authenticated, loggedOut)
 * @param {boolean} primary - Whether this is the primary identity
 * @returns {Object|undefined} The identity payload or undefined if id is empty
 */
function createIdentityPayload(id, authenticatedState = "ambiguous", primary = true) {
  if (id.length === 0) {
    return undefined;
  }

  return {
    id,
    authenticatedState,
    primary,
  };
}

/**
 * Sends a display event to Adobe Experience Platform for a proposition
 * @param {Object} proposition - The proposition that was displayed
 */
function sendDisplayEvent(proposition) {
  const { id, scope, scopeDetails = {} } = proposition;

  alloy("sendEvent", {
    xdm: {
      eventType: "decisioning.propositionDisplay",
      _experience: {
        decisioning: {
          propositions: [
            {
              id: id,
              scope: scope,
              scopeDetails: scopeDetails,
            },
          ],
          propositionEventType: {
            display: 1
          },
        },
      },
    },
  });
}

/**
 * Sends an interaction event to Adobe Experience Platform for a proposition
 * @param {string} label - The action label that was clicked
 * @param {Object} proposition - The proposition that was interacted with
 */
function sendInteractEvent(label, proposition) {
  const { id, scope, scopeDetails = {} } = proposition;

  alloy("sendEvent", {
    xdm: {
      eventType: "decisioning.propositionInteract",
      _experience: {
        decisioning: {
          propositions: [
            {
              id: id,
              scope: scope,
              scopeDetails: scopeDetails,
            },
          ],
          propositionEventType: {
            interact: 1
          },
          propositionAction: {
            label: label
          },
        },
      },
    },
  });
}

/**
 * Updates button elements with personalized content and click handlers
 * @param {Array} buttonActions - Array of button action objects
 * @param {Object} proposition - The proposition containing the actions
 */
function updateButtons(buttonActions, proposition) {
  buttonActions.forEach((buttonAction) => {
    const { id, text, content } = buttonAction;

    const element = document.getElementById(`action-button-${id}`);
    if (element) {
      element.innerText = text;
      
      // Remove existing event listeners to avoid duplicates
      element.replaceWith(element.cloneNode(true));
      const newElement = document.getElementById(`action-button-${id}`);
      
      newElement.addEventListener("click", () => {
        // Show the content message
        if (content) {
          alert(content);
        }
        // Send interaction event
        sendInteractEvent(text, proposition);
      });
    }
  });
}

/**
 * Updates the hero content with personalized data
 * @param {Object} content - The personalized content data
 * @param {Object} proposition - The proposition containing the content
 */
function updateHeroContent(content, proposition) {
  const { heroImageName, heroTitle, heroDescription, buttonActions = [] } = content;

  // Update hero image
  const imageElement = document.querySelector("img.ajo-decision");
  if (imageElement && heroImageName) {
    imageElement.src = `img/${heroImageName}`;
    imageElement.alt = heroTitle || "Personalized content";
  }

  // Update hero title
  const titleElement = document.getElementById("hero-title");
  if (titleElement && heroTitle) {
    titleElement.textContent = heroTitle;
  }

  // Update hero description
  const descriptionElement = document.getElementById("hero-description");
  if (descriptionElement && heroDescription) {
    descriptionElement.textContent = heroDescription;
  }

  // Update buttons
  if (buttonActions.length > 0) {
    updateButtons(buttonActions, proposition);
  }
}

/**
 * Applies personalization content to the page
 * @param {string} surfaceName - The surface name to apply personalization to
 * @returns {Function} A function that processes the personalization result
 */
function applyPersonalization(surfaceName) {
  return function (result) {
    console.log("Personalization result:", result);
    
    const { propositions = [] } = result;
    const proposition = propositions.filter((p) =>
      p.scope.endsWith(surfaceName)
    )[0];

    if (proposition) {
      console.log("Found proposition:", proposition);
      
      // Update personalization status
      const statusElement = document.getElementById("personalization-status");
      if (statusElement) {
        statusElement.textContent = "Personalized content applied!";
        statusElement.className = "text-success";
      }

      // Send display event for the surface
      sendDisplayEvent(proposition);

      // Extract content from the proposition
      const content = proposition.items[0]?.data?.content || {};
      
      // Apply the personalization
      updateHeroContent(content, proposition);

      // Show debug info
      showDebugInfo(proposition);
    } else {
      console.log("No proposition found for surface:", surfaceName);
      
      // Update personalization status
      const statusElement = document.getElementById("personalization-status");
      if (statusElement) {
        statusElement.textContent = "No personalization content available";
        statusElement.className = "text-warning";
      }
    }
  };
}

/**
 * Shows debug information about the proposition
 * @param {Object} proposition - The proposition to display debug info for
 */
function showDebugInfo(proposition) {
  const debugElement = document.getElementById("debug-info");
  const debugContentElement = document.getElementById("debug-content");
  
  if (debugElement && debugContentElement) {
    debugElement.style.display = "block";
    debugContentElement.textContent = JSON.stringify(proposition, null, 2);
  }
}

/**
 * Displays an error message on the page
 * @param {Error} err - The error to display
 */
function displayError(err) {
  console.error("Personalization error:", err);
  
  const containerElement = document.getElementById("main-container");
  if (!containerElement) {
    return;
  }

  const errorHtml = `
    <div id="error-detail" class="page-header">
      <h3>&#128565; There was an error</h3>
      <div class="alert alert-danger" role="alert">
        <strong>Error:</strong> ${err.message}
        <br><small>Check the browser console for more details.</small>
      </div>
    </div>
  `;
  
  containerElement.innerHTML = errorHtml;
}

/**
 * Initialize the personalization demo
 */
function initializeDemo() {
  console.log("Initializing AJO Personalization Demo");
  
  // Use demo data from config when no AJO campaigns are configured
  const demoData = window.CONFIG?.demoContent || {
    heroImageName: "demo-hero.svg",
    heroTitle: "Welcome to Personalized Zaryflo!",
    heroDescription: "This content has been personalized just for you using Adobe Journey Optimizer.",
    buttonActions: [
      { id: 1, text: "Explore Features", content: "Let's explore what we can do together!" },
      { id: 2, text: "Start Journey", content: "Your personalized journey begins now!" },
      { id: 3, text: "Learn More", content: "Discover more about our personalization capabilities." }
    ]
  };

  // If Alloy is not available, show demo content
  if (typeof alloy === 'undefined') {
    console.log("Alloy not available, showing demo content");
    updateHeroContent(demoData, { id: 'demo', scope: 'demo', scopeDetails: {} });
    
    const statusElement = document.getElementById("personalization-status");
    if (statusElement) {
      statusElement.textContent = "Demo content (Alloy not configured)";
      statusElement.className = "text-info";
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDemo);
} else {
  initializeDemo();
}
