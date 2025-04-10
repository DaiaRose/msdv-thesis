
//currently is p5

let accessoryFiles = [
"images/accessories/Glasses2.svg",
"images/accessories/Glasses3.svg",
"images/accessories/Glasses4.svg",
"images/accessories/Glasses5.svg",
];

let faceFiles = [
"images/face/Blank.svg",
"images/face/Concerned.svg",
"images/face/Contempt.svg",
"images/face/Driven.svg",
"images/face/Explaining.svg", 
"images/face/EyesClosed.svg", 
"images/face/Serious.svg",
"images/face/Solemn.svg", 
"images/face/Suspicious.svg", 
"images/face/Tired.svg", 
"images/face/VeryAngry.svg"

];

let headFiles = [
"images/head/Afro.svg",
"images/head/Bun.svg",
"images/head/Bun2.svg",
"images/head/Buns.svg",
"images/head/Cornrows2.svg",
"images/head/FlatTopLong.svg",
"images/head/GrayShort.svg",
"images/head/hat-beanie.svg",
"images/head/Hijab.svg",
"images/head/Long.svg",
"images/head/LongAfro.svg",
"images/head/LongBangs.svg",
"images/head/LongCurly.svg",
"images/head/Medium2.svg",
"images/head/Medium3.svg",
"images/head/MediumBangs2.svg",
"images/head/MediumBangs3.svg",
"images/head/MediumStraight.svg",
"images/head/Short3.svg",
"images/head/Short4.svg",
"images/head/Short5.svg",
"images/head/Shaved1.svg",
"images/head/Shaved2.svg",
"images/head/Turban.svg",
"images/head/Twists2.svg",
"images/head/Twists.svg",
];

// Custom offsets for specific head images
const headOffsets = {
"Bun.svg": { offsetX: -5, offsetY: -10 }, //done
"Bun2.svg": { offsetX: -14, offsetY: -7 }, //done
"Buns.svg": { offsetX: -3, offsetY: -8 }, //done
"Cornrows2.svg": { offsetX: 0, offsetY: 0 }, //done
"Long.svg": { offsetX: -10, offsetY: 5 }, //done
"LongAfro.svg": { offsetX: 0, offsetY: -17 },//done
"LongBangs.svg": { offsetX: -5, offsetY: 13 }, //done
"LongCurly.svg": { offsetX: -5, offsetY: -7 }, //done
"Medium2.svg": { offsetX: -5, offsetY: -4 }, //done
"MediumBangs2.svg": { offsetX: -5, offsetY: 7 }, //done
"Short3.svg": { offsetX: 3, offsetY: 12 }, //done
"Twists.svg": { offsetX: 0, offsetY: 0 }, //done
};

let tooltipDiv;

function setup() {
noCanvas();

// Create a tooltip div
tooltipDiv = createDiv("");
tooltipDiv.style('position', 'absolute');
tooltipDiv.style('background', 'rgba(255, 255, 255, 0.7)');
tooltipDiv.style('color', 'black');
tooltipDiv.style('padding', '2px 5px');
tooltipDiv.style('border-radius', '3px');
tooltipDiv.style('pointer-events', 'none');
tooltipDiv.hide();

// Create a container div styled as a grid (8 columns)
let container = createDiv();
container.style('display', 'grid');
container.style('grid-template-columns', 'repeat(8, 1fr)');
container.style('grid-gap', '5px'); // Optional gap between cells

// Define cell dimensions (using a 800x800 overall area as an example)
let cellWidth = 800 / 8;
let cellHeight = 800 / 8;

// Set a uniform width for all face images (in pixels)
let uniformFaceWidth = 70;

// Create 64 cells
for (let i = 0; i < 64; i++) {
  let cell = createDiv();
  cell.style('position', 'relative');
  cell.style('width', cellWidth + 'px');
  cell.style('height', cellHeight + 'px');
  cell.style('overflow', 'hidden'); // hide parts that exceed the cell
  cell.parent(container);
  
  // Randomly select one file from each category (arrays headFiles, faceFiles, accessoryFiles must be defined)
  let headFile = random(headFiles);
  let faceFile = random(faceFiles);
  let accFile = random(accessoryFiles);
  
  // --- Head Image (native size with custom centering) ---
  let headImg = createImg(headFile);
  headImg.style('position', 'absolute');
  headImg.parent(cell);
  headImg.elt.onload = function() {
    let natW = headImg.elt.naturalWidth;
    let natH = headImg.elt.naturalHeight;
    // Default centering offsets
    let defaultOffsetX = (cellWidth - natW) / 2;
    let defaultOffsetY = (cellHeight - natH) / 2;
    
    // Extract file name from the head file path
    let fileName = headFile.split('/').pop();
    // Look up any custom offset adjustments; default to zero if not found
    let custom = headOffsets[fileName] || { offsetX: 0, offsetY: 0 };
    
    // Apply the combined offset (default centering + custom)
    headImg.style('left', (defaultOffsetX + custom.offsetX) + 'px');
    headImg.style('top', (defaultOffsetY + custom.offsetY) + 'px');
  }
  
  // --- Face Image (forced uniform width) ---
  let faceImg = createImg(faceFile);
  faceImg.style('position', 'absolute');
  faceImg.parent(cell);
  faceImg.elt.onload = function() {
    let natW = faceImg.elt.naturalWidth;
    let natH = faceImg.elt.naturalHeight;
    
    // Calculate the scaling factor to force the uniform width
    let scaleFactor = uniformFaceWidth / natW;
    let uniformFaceHeight = natH * scaleFactor;
    
    // Set the dimensions for the face image
    faceImg.style('width', uniformFaceWidth + 'px');
    faceImg.style('height', uniformFaceHeight + 'px');
    
    // Center the face image in the cell based on the uniform dimensions
    // (Here, we've added an extra 10px to left as an example offset adjustment)
    let offsetX = (cellWidth - uniformFaceWidth) / 2 + 10;
    let offsetY = (cellHeight - uniformFaceHeight) / 2;
    faceImg.style('left', offsetX + 'px');
    faceImg.style('top', offsetY + 'px');
  }
  
  // --- Accessory Image (native size) ---
  let accImg = createImg(accFile);
  accImg.style('position', 'absolute');
  accImg.parent(cell);
  accImg.elt.onload = function() {
    let natW = accImg.elt.naturalWidth;
    let natH = accImg.elt.naturalHeight;
    // Center accessory image using its native dimensions
    let offsetX = (cellWidth - natW) / 2;
    let offsetY = (cellHeight - natH) / 2;
    accImg.style('left', offsetX + 'px');
    accImg.style('top', offsetY + 'px');
  }
  
  // Use mouse events to show/hide tooltip on head image hover
  headImg.mouseOver(() => {
    tooltipDiv.html(headFile.split('/').pop());
    tooltipDiv.show();
  });
  headImg.mouseOut(() => {
    tooltipDiv.hide();
  });
  headImg.mouseMoved(() => {
    tooltipDiv.position(mouseX + 10, mouseY + 10);
  });
}
}