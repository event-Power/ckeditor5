import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertButtonLinkCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      this.editor.model.insertContent(createButtonLink(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "buttonLink"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createButtonLink(writer) {
  const buttonLink = writer.createElement("buttonLink");
  const text = prompt("Enter button Text");
  const btnLink = prompt("Enter button Link");
  const buttonText = writer.createText(text, {
    linkHref: `https://www.${btnLink}`,
  });

  writer.append(buttonText, buttonLink);

  return buttonLink;
}
