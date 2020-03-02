// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 780, height: 700 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

figma.ui.onmessage = async msg => {
  //console.log(msg);
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  //
  const newPage = figma.createPage();
  newPage.name = "Colors";
  let scss = "";

  if (msg.type === "create-rectangles") {
    const nodes = [];
    const colors = msg.colors;

    const createColorDataCode = (cd: any) => {
      //console.log(cd);
      return { r: cd.r / 255, g: cd.g / 255, b: cd.b / 255 };
    };

    const setColorStyle = (name: string, color: RGB) => {
      const style = figma.createPaintStyle();
      figma.createPaintStyle;
      style.name = name;
      const rgbColor: RGB = color;
      const alpha: number = 1;
      const solidPaint: SolidPaint = {
        type: "SOLID",
        color: rgbColor,
        opacity: alpha
      };
      style.paints = [solidPaint];
    };

    const createSCSS = group => {
      // scss
      scss += `// ${group.prefix} \n`;
      group.colors.forEach(item => {
        scss += `$-${group.prefix}-${item.label}: ${item.color}; \n`;
      });
      scss += "\n";
      //console.log(scss);
    };

    colors.forEach((group, ind) => {
      const colorGroup = group.colors;
      createSCSS(group);
      for (let i = 0; i < colorGroup.length; i++) {
        const color = createColorDataCode(colorGroup[i].rgbColor);
        const circle = figma.createEllipse();
        circle.name = colorGroup[i].label;
        circle.x = i * 150;
        circle.y = ind * 150;
        circle.fills = [{ type: "SOLID", color: color }];
        newPage.appendChild(circle);
        nodes.push(circle);
        setColorStyle("$-" + group.prefix + "-" + colorGroup[i].label, color);
      }
    });

    //add scss
    const scssText = figma.createText();
    scssText.x = figma.viewport.center.x;
    scssText.y = (colors.length + 1) * 150;
    await figma.loadFontAsync(scssText.fontName as FontName);
    //scssText.fontName = { family: "consolas", style: "Regular" };
    scssText.fontSize = 24;
    scssText.characters = scss;
    newPage.appendChild(scssText);
    nodes.push(scssText);

    newPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
