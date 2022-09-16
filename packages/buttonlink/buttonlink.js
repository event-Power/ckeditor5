import ButtonLinkEditing from "./buttonlinkediting";
import ButtonLinkUI from "./buttonlinkui";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class SimpleBox extends Plugin {
  static get requires() {
    return [ButtonLinkEditing, ButtonLinkUI];
  }
}
