import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import BackgroundColorCommand from "./backgroundcolorcommand";
import {
  BACKGROUND_COLOR,
  THEME_COLOR_ATTRIBUTE,
  DEFAULT_COLORS,
} from "./constants";

function renderUpcastElement() {
  return (element) => {
    const paletteKey = element.getAttribute(THEME_COLOR_ATTRIBUTE);
    if (paletteKey) {
      return paletteKey;
    }
    const color = element.getStyle("color");
    if (color) {
      return color.replace(/\s/g, "");
    }
    return null;
  };
}

function matchUpcastElement() {
  return (element) => {
    if (element.name === "span") {
      const color = element.getStyle("background-color");
      const paletteKey = element.getAttribute(THEME_COLOR_ATTRIBUTE);
      if (paletteKey) {
        return {
          name: true,
          attributes: [THEME_COLOR_ATTRIBUTE],
        };
      }
      if (color) {
        return {
          name: true,
          styles: ["background-color"],
        };
      }
    }
    return null;
  };
}

function renderDowncastElement(themeColors) {
  return (modelAttributeValue, { writer: viewWriter }) => {
    const themeColor = themeColors.find(
      (item) => item.paletteKey === modelAttributeValue
    );
    const attributes = themeColor
      ? {
          [THEME_COLOR_ATTRIBUTE]: themeColor.paletteKey,
          style: `background-color:${themeColor.color}`,
        }
      : modelAttributeValue
      ? {
          style: `background-color:${modelAttributeValue}`,
        }
      : {};
    return viewWriter.createAttributeElement("span", attributes, {
      priority: 7,
    });
  };
}

export default class BackgroundColorEditing extends Plugin {
  static get pluginName() {
    return "BackgroundColorEditing";
  }

  constructor(editor) {
    super(editor);

    editor.config.define(BACKGROUND_COLOR, {
      themeColors: [],
      exactColors: DEFAULT_COLORS.map((color) => ({ color })),
      columns: 6,
    });

    editor.conversion.for("upcast").elementToAttribute({
      view: matchUpcastElement(),
      model: {
        key: BACKGROUND_COLOR,
        value: renderUpcastElement(),
      },
    });

    editor.conversion.for("downcast").attributeToElement({
      model: BACKGROUND_COLOR,
      view: renderDowncastElement(
        editor.config.get(BACKGROUND_COLOR).themeColors,
        editor
      ),
    });

    editor.commands.add(BACKGROUND_COLOR, new BackgroundColorCommand(editor));

    editor.model.schema.extend("$text", { allowAttributes: BACKGROUND_COLOR });

    editor.model.schema.setAttributeProperties(BACKGROUND_COLOR, {
      isFormatting: true,
      copyOnEnter: true,
    });
  }
}
