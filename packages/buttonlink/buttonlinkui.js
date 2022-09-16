import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class ButtonLinkUI extends Plugin {
  init() {
    console.log("ButtonLinkUI#init() got called");

    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("buttonLink", (locale) => {
      const command = editor.commands.get("insertButtonLink");

      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Button"),
        withText: true,
        tooltip: true,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      this.listenTo(buttonView, "execute", () =>
        editor.execute("insertButtonLink")
      );

      return buttonView;
    });
  }
}
