figma.showUI(__html__, { width: 780, height: 700 });

figma.ui.onmessage = async msg => {
  const newPage = figma.createPage();
  newPage.name = "Colors";
  let scss = "";

  if (msg.type === "create-rectangles") {
    const nodes = [];
    const colors = msg.colors;
    console.log(colors);
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
      scss += `// ${group.title} \n`;
      group.group.forEach(item => {
        scss += `$-${group.title}-${item.label}: ${item.color}; \n`;
      });
      scss += "\n";
      //console.log(scss);
    };

    colors.forEach((group, ind) => {
      const colorGroup = group.group;
      //console.log(group);
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
        setColorStyle("$-" + group.title + "-" + colorGroup[i].label, color);
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
