import { Locator } from "@playwright/test";
import {BaseComponent} from "./BaseComponent";

export class NotificationComponent extends BaseComponent{
    constructor(root: Locator) {
        super(root);
    }
}