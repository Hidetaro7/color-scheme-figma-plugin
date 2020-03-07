figma.showUI(__html__, { width: 780, height: 700 });

figma.ui.onmessage = async msg => {
  const newPage = figma.createPage();
  newPage.name = "Colors";
  let scss =
    "// SCSS\n// --------------------------------------------------------\n\n";

  if (msg.type === "create-rectangles") {
    const nodes = [];
    const colors = msg.colors;
    //console.log(colors);
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
        circle.x = i * 150 + figma.viewport.center.x;
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
    const fontlist = await figma.listAvailableFontsAsync();
    const codeFont = fontlist.filter(font => {
      return (
        font.fontName.family.match(
          /Consolas|Source Code Pro|Inconsolata|Menlo|Monaco|Roboto Mono|Roboto/gi
        ) && font.fontName.style === "Regular"
      );
    });
    if (codeFont.length !== 0) {
      await figma.loadFontAsync({
        family: codeFont[0].fontName.family,
        style: "Regular"
      });
      scssText.fontName = codeFont[0].fontName;
    }
    //console.log(codeFont);

    scssText.fontSize = 24;
    scssText.characters = scss;
    newPage.appendChild(scssText);
    nodes.push(scssText);
    newPage.selection = nodes;
    figma.currentPage = newPage;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
