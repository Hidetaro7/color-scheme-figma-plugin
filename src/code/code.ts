const rgb = figma.util.rgb;
figma.showUI(__html__, { width: 780, height: 700 });

figma.ui.onmessage = async (msg) => {
  const newPage = figma.createPage();
  newPage.name = "Colors";
  let scss = "# CSS Variables \n\n";
  let tailwind = "# tailwind.config \n\n";
  tailwind += `
  module.exports = {
    theme: {
      colors: {
  `;

  if (msg.type === "color-schemes") {
    const message = JSON.parse(msg.message);
    const tokens = message.tokens;
    const schemes = message.schemes;
    const nodes = [];

    const setColorStyle = (name: string, color: RGB) => {
      const style = figma.createPaintStyle();
      figma.createPaintStyle;
      style.name = name;
      style.description = "Color Scheme プラグインで作成されたスタイルです。";
      const rgbColor: RGB = color;
      const alpha: number = 1;
      const solidPaint: SolidPaint = {
        type: "SOLID",
        color: rgbColor,
        opacity: alpha,
      };
      style.paints = [solidPaint];
    };

    const createCSSVars = (group) => {
      // scss
      scss += `// ${group.prefix} \n`;
      tokens.forEach((token, index) => {
        scss += `--${group.prefix}-${token}: ${group.colors[index]}; \n`;
      });
      scss += "\n";
    };

    const createTailwind = (group) => {
      // tailwind
      tailwind += `      '${group.prefix}': { \n`;
      tokens.forEach((token, index) => {
        tailwind += `          ${token}: '${group.colors[index]}', \n`;
      });
      tailwind += "        },\n";
    };

    schemes.forEach((groups, ind) => {
      const resColors = tokens.map((token, index) => {
        return groups[token];
      });
      const resData = {
        id: groups.id,
        prefix: groups.prefix,
        colors: resColors,
      };

      createCSSVars(resData);
      createTailwind(resData);

      for (let i = 0; i < resData.colors.length; i++) {
        const circle = figma.createEllipse();
        circle.name = resData.prefix;
        circle.x = i * 150 + figma.viewport.center.x;
        circle.y = ind * 150;
        circle.fills = [{ type: "SOLID", color: rgb(resData.colors[i]) }];
        newPage.appendChild(circle);
        nodes.push(circle);
        setColorStyle(
          resData.prefix + "/" + resData.prefix + "-" + tokens[i],
          rgb(resData.colors[i])
        );
      }
    });

    tailwind += `      },
    },
  }`;

    //add scss
    const scssText = figma.createText();
    scssText.x = figma.viewport.center.x;
    scssText.y = (schemes.length + 1) * 150;
    //add Tailwind
    const tailwindText = figma.createText();

    const fontlist = await figma.listAvailableFontsAsync();
    const codeFont = fontlist.filter((font) => {
      return (
        font.fontName.family.match(
          /Consolas|Source Code Pro|Inconsolata|Menlo|Monaco|Roboto Mono|Roboto/gi
        ) && font.fontName.style === "Regular"
      );
    });
    if (codeFont.length !== 0) {
      await figma.loadFontAsync({
        family: codeFont[0].fontName.family,
        style: "Regular",
      });
      scssText.fontName = tailwindText.fontName = codeFont[0].fontName;
    }

    scssText.fontSize = tailwindText.fontSize = 16;
    scssText.characters = scss;
    tailwindText.characters = tailwind;
    newPage.appendChild(scssText);

    tailwindText.x = figma.viewport.center.x + scssText.width + 50;
    tailwindText.y = scssText.y;
    newPage.appendChild(tailwindText);
    nodes.push(scssText);
    nodes.push(tailwindText);

    newPage.selection = nodes;
    figma.currentPage = newPage;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
  figma.closePlugin();
};
