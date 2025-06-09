function initializeCursor() {
  // Mouse position
  let mousePosX = 0;
  let mousePosY = 0;

  // Cursor element
  let mouseCircle = document.getElementById("cursor");

  // Rate of the lerp
  let rate = 0.15;

  // Custom cursor position
  let customCursorPosX = 0;
  let customCursorPosY = 0;

  // Whether the mouse is on-screen
  let cursorActive = false;

  // Smoothly transition between two values
  function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
  }

  document.body.addEventListener("mouseenter", (e) => {
    cursorActive = true;
    mouseCircle.style.opacity = 1;

    // Update stored mouse position
    mousePosX = customCursorPosX = e.clientX;
    mousePosY = customCursorPosY = e.clientY;
  });

  document.body.addEventListener("mouseleave", (e) => {
    cursorActive = false;
    mouseCircle.style.opacity = 0;
  });

  document.addEventListener("mousemove", (e) => {
    // Update stored mouse position
    mousePosX = e.clientX;
    mousePosY = e.clientY;
  });

  document.addEventListener("mouseover", (e) => {
    // Only inflate when hovering over a clickable element
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
      return;
    }

    // Change custom cursor style
    // The animation is handled through a CSS transition
    mouseCircle.style.background = "white";
    mouseCircle.style.transform = "scale(2)";
    rate = 0.3;
  });

  document.addEventListener("mouseout", (e) => {
    // Only deflate when exiting a clickable element
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
      return;
    }

    // Reset style to default
    mouseCircle.style.background = "";
    mouseCircle.style.transform = "";
    rate = 0.15;
  });

  document.addEventListener("mousedown", (e) => {
    // Only shrink when pressing on a clickable element
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
      return;
    }

    mouseCircle.style.transform = "scale(1)";
  });

  document.addEventListener("mouseup", (e) => {
    // Only shrink when pressing on a clickable element
    if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
      return;
    }

    mouseCircle.style.transform = "scale(2)";
  });

  function delayMouseFollow() {
    // Move the custom cursor closer to the actual cursor
    customCursorPosX = lerp(customCursorPosX, mousePosX, rate);
    customCursorPosY = lerp(customCursorPosY, mousePosY, rate);

    // Apply position
    mouseCircle.style.top = customCursorPosY + "px";
    mouseCircle.style.left = customCursorPosX + "px";

    requestAnimationFrame(delayMouseFollow);
  }

  delayMouseFollow();
}

if (window.matchMedia(`(prefers-reduced-motion)`)) {
  initializeCursor();
}
